package cn.luixtech.passport.server.pojo;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.io.Serializable;

@Schema(description = "user reset DTO")
@Data
public class Reset implements Serializable {

    private static final long serialVersionUID = -6442194590613017034L;

    @Schema(description = "reset code")
    @NotNull
    private String resetCode;

    @Schema(description = "new raw password")
    @NotNull
    @Size(min = ManagedUser.RAW_PASSWORD_MIN_LENGTH, max = ManagedUser.RAW_PASSWORD_MAX_LENGTH)
    private String newRawPassword;

}
