package com.luixtech.sso.server.controller;


import com.luixtech.sso.starter.utils.AuthUtils;
import com.luixtech.utilities.response.Result;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

import static com.luixtech.sso.starter.auth.AuthUser.ROLE_ADMIN;
import static com.luixtech.sso.starter.filter.SsoClientLoginFilter.REDIRECT_URL_PARAM;

@Controller
@Slf4j
@AllArgsConstructor
public class SsoController {
    /**
     * Redirect is allowed at backend for a GET method
     */
    @GetMapping("/open-api/login")
    public String login(HttpServletRequest request) {
        Subject subject = SecurityUtils.getSubject();
        if (subject.getPrincipal() == null) {
            // Open login view
            return "login";
        } else {
            // Already login
            String redirectUrl = request.getParameter(REDIRECT_URL_PARAM);
            if (StringUtils.isEmpty(redirectUrl)) {
                // Redirect to homepage
                return "forward:/";
            } else {
                // Redirect to the specified URL
                return "redirect:" + redirectUrl;
            }
        }
    }

    /**
     * Handle form submit
     *
     * @param username    username
     * @param password    password
     * @param redirectUrl redirectUrl
     * @param rememberMe  remember me
     * @param request     {@link HttpServletRequest} object
     * @return an {@link Result} object
     */
    @PostMapping("/open-api/login")
    public String submitLogin(HttpServletRequest request, String username, String password, String redirectUrl, boolean rememberMe) {
        UsernamePasswordToken userToken = new UsernamePasswordToken(username, password, rememberMe);
        // Validate user from database
        SecurityUtils.getSubject().login(userToken);
//        String redirectUrl = request.getParameter(REDIRECT_URL_PARAM);
        return StringUtils.isNotEmpty(redirectUrl) ? "redirect:" + redirectUrl : "forward:/";
    }

    @GetMapping("/open-api/login-status")
    @ResponseBody
    public boolean checkLoginStatus() {
        return AuthUtils.isAuthenticated() || AuthUtils.isRemembered();
    }

    @RequiresRoles(ROLE_ADMIN)
    @GetMapping("/api/admin-account")
    public String adminAccount(Model model) {
        model.addAttribute("name", AuthUtils.getCurrentUsername());
        return "admin-account";
    }
}
