package cn.luixtech.passport.server.config.oauth.jackson.mixin;

import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(use = JsonTypeInfo.Id.CLASS, include = JsonTypeInfo.As.WRAPPER_ARRAY)
public abstract class ArrayWhitelistMixin {

}