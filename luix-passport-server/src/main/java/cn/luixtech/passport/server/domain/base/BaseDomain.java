package cn.luixtech.passport.server.domain.base;

import com.luixtech.uidgenerator.core.id.IdGenerator;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import lombok.Data;
import org.apache.commons.lang3.StringUtils;

import java.io.Serializable;

@Data
@MappedSuperclass
public abstract class BaseDomain implements Serializable {
    private static final long serialVersionUID = -322694592498870599L;

    /**
     * ID should NOT be Long type, because the number which exceeds 16 digits will be display as 0 in front end.
     * e.g. the value 526373442322434543 will be displayed as 526373442322434500 in front end
     * If id is null, save operation equals insert, or else save operation equals update
     */
    @Schema(description = "ID")
    @Id
    protected String id;

    @PrePersist
    protected void prePersist() {
        if (StringUtils.isEmpty(id)) {
            id = IdGenerator.generateId();
        }
    }
}
