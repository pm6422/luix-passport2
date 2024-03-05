package cn.luixtech.passport.server.domain;

import cn.luixtech.passport.server.domain.base.AbstractAuditableDomain;
import com.luixtech.utilities.annotation.IncKey;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class DataDict extends AbstractAuditableDomain implements Serializable {
    @Serial
    private static final long   serialVersionUID = 1L;
    public static final  String TABLE_NAME       = "data_dict";

    @IncKey(prefix = "DCT")
    @Column(unique = true, nullable = false)
    private String num;

    @Schema(required = true)
    @NotEmpty(message = "categoryCode:{Validation.NotEmpty}")
    @Column(nullable = false)
    private String categoryCode;

    @Schema(required = true)
    @NotEmpty(message = "dictCode:{Validation.NotEmpty}")
    @Column(nullable = false)
    private String dictCode;

    private String dictName;

    private String remark;

    private Boolean enabled;
}
