package cn.luixtech.passport.server.domain;

import cn.luixtech.passport.server.domain.base.BaseDomain;
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
public class UserPermission extends BaseDomain implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Schema(required = true)
    @NotEmpty(message = "userId:{Validation.NotEmpty}")
    @Column(nullable = false)
    private String userId;

    @Schema(required = true)
    @NotEmpty(message = "permission:{Validation.NotEmpty}")
    @Column(nullable = false)
    private String permission;
}
