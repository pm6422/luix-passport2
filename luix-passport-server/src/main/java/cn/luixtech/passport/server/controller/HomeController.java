package cn.luixtech.passport.server.controller;

import cn.luixtech.passport.server.utils.AuthUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
    @RequestMapping(value = {"/", "/index"})
    public String index(Model model) {
        model.addAttribute("username", AuthUtils.getCurrentUsername());
        model.addAttribute("swaggerEnabled", AuthUtils.getCurrentUser().getAuthorities()
                .contains(new SimpleGrantedAuthority("ROLE_DEVELOPER")));
        return "index";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }
}
