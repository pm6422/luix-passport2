package cn.luixtech.passport.server.service;


import cn.luixtech.passport.server.domain.User;
import cn.luixtech.passport.server.domain.UserPhoto;

public interface UserPhotoService {

    void insert(String userId, byte[] photoData);

    void update(UserPhoto photo, byte[] photoData);

    void save(User user, byte[] photoData);
}