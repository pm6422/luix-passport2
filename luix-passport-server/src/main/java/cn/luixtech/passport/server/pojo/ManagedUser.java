package cn.luixtech.passport.server.pojo;


import cn.luixtech.passport.server.persistence.tables.pojos.User;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

import java.util.List;


/**
 * A DTO extending the UserDTO, which is meant to be used in the user management UI.
 */
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class ManagedUser extends User {

    private static final long serialVersionUID        = -8095593058946091229L;
    public static final  int  RAW_PASSWORD_MIN_LENGTH = 5;
    public static final  int  RAW_PASSWORD_MAX_LENGTH = 50;

    @Schema(required = true)
    @NotEmpty(message = "Password:{Validation.NotEmpty}")
    @Size(min = RAW_PASSWORD_MIN_LENGTH, max = RAW_PASSWORD_MAX_LENGTH)
    private String password;

    private List<String> authorities;

    public ManagedUser(User user) {
        BeanUtils.copyProperties(user, this);
    }

    public User toUser() {
        User user = new User();
        BeanUtils.copyProperties(this, user);
        return user;
    }
}
