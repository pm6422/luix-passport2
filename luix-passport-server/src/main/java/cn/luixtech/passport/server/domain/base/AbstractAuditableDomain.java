package cn.luixtech.passport.server.domain.base;

import com.luixtech.uidgenerator.core.id.IdGenerator;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.Data;
import org.apache.commons.lang3.StringUtils;

import java.io.Serializable;
import java.time.Instant;

import static cn.luixtech.passport.server.utils.AuthUtils.getCurrentUsername;
import static org.apache.commons.lang3.StringUtils.defaultIfEmpty;

/**
 * Abstract auditable domain for log createdBy, createdTime, modifiedBy and modifiedTime automatically.
 */
@Data
@MappedSuperclass
public abstract class AbstractAuditableDomain extends BaseDomain implements Serializable {
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
    }

    @PreUpdate
    protected void preUpdate() {
        modifiedTime = Instant.now();
        modifiedBy = defaultIfEmpty(getCurrentUsername(), "SYSTEM");
    }
}
