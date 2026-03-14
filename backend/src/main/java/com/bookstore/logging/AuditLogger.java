package com.bookstore.logging;

import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class AuditLogger {
    private static final Logger logger = LoggerFactory.getLogger("AUDIT");

    public void log(String eventType, String actorId, String ip, String userAgent, Map<String, Object> metadata) {
        logger.info(
                "auditEvent={} actorId={} ip={} userAgent={} metadata={}",
                eventType,
                actorId,
                ip,
                userAgent,
                metadata
        );
    }
}
