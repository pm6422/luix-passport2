package cn.luixtech.passport.server.domain;

import cn.luixtech.passport.server.domain.base.AbstractBaseDomain;
import jakarta.persistence.Entity;
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
public class Task extends AbstractBaseDomain implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private String title;
    private String status;
    private String label;
    private String priority;
}
