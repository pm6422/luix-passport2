package cn.luixtech.passport.server.service;

import cn.luixtech.passport.server.pojo.OAuth2Client;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface Oauth2ClientService {
    void insert(OAuth2Client pojo);

    OAuth2Client findById(String id);

    void update(OAuth2Client domain);

    Page<OAuth2Client> find(Pageable pageable, String clientId);
}
