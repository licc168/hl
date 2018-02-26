package com.licc.dove.security;

import org.springframework.security.core.GrantedAuthority;

/**
 * Function:(这里用一句话描述这个类的作用)
 *
 * @author Administrator
 * @version 1.0.0
 * @date 2018/1/11 16:49
 * @see
 */
public class MethodAuthority  implements GrantedAuthority {

  private static final long serialVersionUID = 1490168253390838022L;
  private String methodUrl;
  @Override
  public String getAuthority() {
    return methodUrl;
  }

  public MethodAuthority(String methodUrl){
    this.methodUrl = methodUrl;
  }
}
