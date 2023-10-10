package com.luixtech.sso.client.controller;

import com.luixtech.sso.starter.utils.AuthUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class HomeController {

    @RequestMapping(value = {"", "/"})
    public String index(Model model) {
        model.addAttribute("authenticated", AuthUtils.isAuthenticated());
        model.addAttribute("user", AuthUtils.getCurrentUser());

        boolean hasAdminRole = AuthUtils.hasRole("ROLE_ADMIN");
        boolean hasPermission = AuthUtils.hasPermission("user:insert");

        return "index";
    }
}