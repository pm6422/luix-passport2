package cn.luixtech.passport.server.domain.base;

import cn.luixtech.passport.server.service.SeqNumberService;
import com.google.common.base.CaseFormat;
import com.luixtech.utilities.annotation.IncKey;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.apache.commons.lang3.StringUtils;
import org.springframework.util.ReflectionUtils;

import java.io.Serial;
import java.io.Serializable;
import java.time.Instant;

import static cn.luixtech.passport.server.PassportServerApplication.getApplicationContext;
import static cn.luixtech.passport.server.utils.AuthUtils.getCurrentUsername;
import static org.apache.commons.lang3.StringUtils.defaultIfEmpty;

/**
 * Abstract auditable domain for log createdBy, createdTime, modifiedBy and modifiedTime automatically.
 */
@Data
@EqualsAndHashCode(callSuper = true)
@MappedSuperclass
public abstract class AbstractAuditableDomain extends BaseDomain implements Serializable {
    @Serial
    private static final long serialVersionUID = -322694592498870599L;

    /**
     * Set the proper value when inserting.
     */
    @Schema(description = "creator")
    @Column(updatable = false)
    protected String createdBy;

    /**
     * Set the current time when inserting.
     */
    @Schema(description = "created time")
    @Column(updatable = false)
    protected Instant createdTime;

    /**
     * Set the proper value when updating.
     */
    @Schema(description = "last modifier")
    protected String modifiedBy;

    /**
     * Set the current time when updating.
     */
    @Schema(description = "last modified time")
    protected Instant modifiedTime;

    @PrePersist
    protected void prePersist() {
        super.prePersist();
        createdTime = modifiedTime = Instant.now();
        createdBy = modifiedBy = defaultIfEmpty(getCurrentUsername(), "SYSTEM");

        ReflectionUtils.doWithFields(this.getClass(), field -> {
            if (field.isAnnotationPresent(IncKey.class)) {
                ReflectionUtils.makeAccessible(field);
                Object numValue = field.get(this);
                if (numValue == null || numValue.toString().isEmpty()) {
                    // Creation operation if it is null
                    // Assign id with a user customized one
                    IncKey incKeyAnnotation = field.getAnnotation(IncKey.class);
                    String num;

                    // Convert pascal name to underscore one
                    String tableName = CaseFormat.UPPER_CAMEL.to(CaseFormat.LOWER_UNDERSCORE, this.getClass().getSimpleName());

                    if (StringUtils.isEmpty(incKeyAnnotation.prefix())) {
                        num = StringUtils.EMPTY + getApplicationContext().getBean(SeqNumberService.class).getNextSeqNumber(tableName);
                    } else {
                        num = incKeyAnnotation.prefix() + getApplicationContext().getBean(SeqNumberService.class).getNextSeqNumber(tableName);
                    }
                    field.set(this, num);
                }
            }
        });
    }

    @PreUpdate
    protected void preUpdate() {
        modifiedTime = Instant.now();
        modifiedBy = defaultIfEmpty(getCurrentUsername(), "SYSTEM");
    }
}
