package in.ayushdev.billingsoftware.service;

import in.ayushdev.billingsoftware.io.UserRequest;
import in.ayushdev.billingsoftware.io.UserResponse;

import java.util.List;

public interface UserService {

    UserResponse createUser(UserRequest request);

    String getUserRole(String email);

    List<UserResponse> readUsers();

    void deleteUser(String id);



}
