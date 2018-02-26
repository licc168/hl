package com.licc.dove.dao.anno;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Column {
    /**
     * 数据表列名
     * @author lichangchao
     * @date 2017年6月22日 上午10:58:56
     * @return
     */
	String name() default "";
}
