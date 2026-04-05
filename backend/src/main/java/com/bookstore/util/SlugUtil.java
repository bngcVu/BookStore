package com.bookstore.util;

import java.text.Normalizer;
import java.util.Locale;
import java.util.regex.Pattern;

/**
 * Tiện ích tạo slug từ chuỗi tiếng Việt.
 * Ví dụ: "Sách Tốt" → "sach-tot"
 */
public final class SlugUtil {

    private static final Pattern NON_LATIN       = Pattern.compile("[^\\w-]");
    private static final Pattern WHITESPACE      = Pattern.compile("[\\s]+");
    private static final Pattern MULTI_DASH      = Pattern.compile("-{2,}");
    private static final Pattern LEADING_TRAILING = Pattern.compile("^-|-$");

    private SlugUtil() {}

    public static String toSlug(String input) {
        if (input == null || input.isBlank()) return "";

        String normalized = Normalizer.normalize(input, Normalizer.Form.NFD);
        // Bỏ dấu (combining diacritical marks)
        String ascii = normalized.replaceAll("\\p{InCombiningDiacriticalMarks}+", "");
        // Thay khoảng trắng bằng dấu gạch ngang
        String slug = WHITESPACE.matcher(ascii.toLowerCase(Locale.ROOT)).replaceAll("-");
        // Bỏ ký tự không hợp lệ
        slug = NON_LATIN.matcher(slug).replaceAll("");
        // Thu gọn nhiều dấu gạch ngang liên tiếp
        slug = MULTI_DASH.matcher(slug).replaceAll("-");
        // Bỏ dấu gạch ở đầu/cuối
        slug = LEADING_TRAILING.matcher(slug).replaceAll("");
        return slug;
    }

    /** Tạo slug kèm số đuôi khi slug đã tồn tại */
    public static String toSlugWithSuffix(String input, int suffix) {
        return toSlug(input) + "-" + suffix;
    }
}
