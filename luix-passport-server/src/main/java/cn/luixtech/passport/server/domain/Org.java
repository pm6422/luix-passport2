package cn.luixtech.passport.server.domain;

import cn.luixtech.passport.server.domain.base.AbstractAuditableDomain;
import jakarta.persistence.*;
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
public class Org extends AbstractAuditableDomain implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private String  remark;
    private Boolean enabled;

    @Basic(fetch = FetchType.LAZY)
    @Lob
    @Column(columnDefinition = "longblob", nullable = false)
    private byte[] photo;
}
