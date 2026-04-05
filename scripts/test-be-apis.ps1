param(
    [string]$BaseUrl = "http://localhost:8080",
    [string]$Email,
    [string]$Password = "Aa@123456",
    [string]$FullName = "BookStore Test User",
    [string]$Phone = "",
    [string]$OtpCode = ""
)

$ErrorActionPreference = "Stop"

function Write-Step {
    param([string]$Message)
    Write-Host "`n=== $Message ===" -ForegroundColor Cyan
}

function Convert-Body {
    param([object]$Body)
    if ($null -eq $Body) {
        return $null
    }
    return ($Body | ConvertTo-Json -Depth 10)
}

function Parse-ErrorBody {
    param([System.Management.Automation.ErrorRecord]$ErrorRecord)
    try {
        $response = $ErrorRecord.Exception.Response
        if ($null -eq $response) {
            return $ErrorRecord.Exception.Message
        }

        $stream = $response.GetResponseStream()
        if ($null -eq $stream) {
            return $ErrorRecord.Exception.Message
        }

        $reader = New-Object System.IO.StreamReader($stream)
        $body = $reader.ReadToEnd()
        $reader.Close()

        if ([string]::IsNullOrWhiteSpace($body)) {
            return $ErrorRecord.Exception.Message
        }

        return $body
    } catch {
        return $ErrorRecord.Exception.Message
    }
}

function Invoke-Api {
    param(
        [Parameter(Mandatory = $true)][string]$Method,
        [Parameter(Mandatory = $true)][string]$Path,
        [object]$Body = $null,
        [string]$BearerToken = ""
    )

    $uri = "$BaseUrl$Path"
    $headers = @{}

    if (-not [string]::IsNullOrWhiteSpace($BearerToken)) {
        $headers["Authorization"] = "Bearer $BearerToken"
    }

    $params = @{
        Method      = $Method
        Uri         = $uri
        Headers     = $headers
        ContentType = "application/json"
    }

    if ($null -ne $Body) {
        $params["Body"] = Convert-Body -Body $Body
    }

    try {
        return Invoke-RestMethod @params
    } catch {
        $errorBody = Parse-ErrorBody -ErrorRecord $_
        throw "API call failed: $Method $Path`n$errorBody"
    }
}

function Is-EmailAlreadyExistsError {
    param([string]$Message)
    if ([string]::IsNullOrWhiteSpace($Message)) {
        return $false
    }
    return $Message -match "EMAIL_ALREADY_EXISTS|Email already exists"
}

function Is-InvalidCredentialsError {
    param([string]$Message)
    if ([string]::IsNullOrWhiteSpace($Message)) {
        return $false
    }
    return $Message -match "INVALID_CREDENTIALS|Invalid credentials"
}

if ([string]::IsNullOrWhiteSpace($Email)) {
    $timestamp = Get-Date -Format "yyyyMMddHHmmss"
    $Email = "bookstoretest$timestamp@yopmail.com"
}

Write-Host "BaseUrl : $BaseUrl" -ForegroundColor Yellow
Write-Host "Email   : $Email" -ForegroundColor Yellow

Write-Step "1) Health check"
$health = Invoke-Api -Method "GET" -Path "/api/health"
Write-Host "Health message: $($health.message)"

Write-Step "2) Register"
$registerBody = @{
    email    = $Email
    password = $Password
    fullName = $FullName
    phone    = $Phone
}
$shouldVerifyOtp = $true
$isExistingEmail = $false
try {
    $register = Invoke-Api -Method "POST" -Path "/api/auth/register" -Body $registerBody
    Write-Host "Register message: $($register.message)"
} catch {
    $errorMessage = $_.Exception.Message
    if (Is-EmailAlreadyExistsError -Message $errorMessage) {
        $shouldVerifyOtp = $false
        $isExistingEmail = $true
        Write-Host "Email da ton tai trong DB. Bo qua buoc register/verify OTP va tiep tuc login." -ForegroundColor Yellow
    } else {
        throw
    }
}

if ($shouldVerifyOtp) {
    if ([string]::IsNullOrWhiteSpace($OtpCode)) {
        Write-Host "Lay OTP tu email/Yopmail roi nhap vao ben duoi." -ForegroundColor Magenta
        $OtpCode = Read-Host "OTP"
    }

    Write-Step "3) Verify register OTP"
    $verifyBody = @{
        email = $Email
        code  = $OtpCode
    }
    $verify = Invoke-Api -Method "POST" -Path "/api/auth/verify" -Body $verifyBody
    Write-Host "Verify message: $($verify.message)"
} else {
    Write-Step "3) Verify register OTP"
    Write-Host "Skip verify OTP vi email da ton tai." -ForegroundColor Yellow
}

Write-Step "4) Login"
$loginBody = @{
    email    = $Email
    password = $Password
}
$accessToken = ""
try {
    $login = Invoke-Api -Method "POST" -Path "/api/auth/login" -Body $loginBody
    Write-Host "Login message: $($login.message)"
    $accessToken = $login.data.accessToken
} catch {
    $loginErrorMessage = $_.Exception.Message
    if ($isExistingEmail -and (Is-InvalidCredentialsError -Message $loginErrorMessage)) {
        Write-Host "Khong login duoc voi mat khau hien tai cho tai khoan da ton tai. Script ket thuc khong loi." -ForegroundColor Yellow
    } else {
        throw
    }
}

if (-not [string]::IsNullOrWhiteSpace($accessToken)) {
    Write-Step "5) Get profile"
    $profile = Invoke-Api -Method "GET" -Path "/api/v1/users/me" -BearerToken $accessToken
    Write-Host "Profile message: $($profile.message)"
} else {
    Write-Step "5) Get profile"
    Write-Host "Skip get profile vi khong co access token." -ForegroundColor Yellow
}

Write-Step "Done"
Write-Host "Tat ca API test da chay xong." -ForegroundColor Green
Write-Host "Tai khoan test: $Email" -ForegroundColor Green
