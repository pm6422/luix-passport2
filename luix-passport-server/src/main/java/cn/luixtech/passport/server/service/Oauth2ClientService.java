package cn.luixtech.passport.server.service;

import cn.luixtech.passport.server.pojo.Oaauth2Client;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface Oauth2ClientService {
    void insert(Oaauth2Client pojo);

    Oaauth2Client findById(String id);

    void update(Oaauth2Client domain);

    Page<Oaauth2Client> find(Pageable pageable, String clientId);
}
