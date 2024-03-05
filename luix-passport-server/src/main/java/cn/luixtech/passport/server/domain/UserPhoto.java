package cn.luixtech.passport.server.domain;

import cn.luixtech.passport.server.domain.base.AbstractAuditableDomain;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
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
public class UserPhoto extends AbstractAuditableDomain implements Serializable {
    @Serial
    private static final long serialVersionUID = -8375847941374800940L;

    @Schema(required = true)
    @NotNull
    @Basic(fetch = FetchType.LAZY)
    @Lob
    @Column(columnDefinition = "longblob", nullable = false)
    private byte[] profilePhoto;
}
