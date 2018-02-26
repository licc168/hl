package com.licc.dove.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.session.hazelcast.config.annotation.web.http.EnableHazelcastHttpSession;

import com.hazelcast.config.Config;
import com.hazelcast.core.Hazelcast;
import com.hazelcast.core.HazelcastInstance;

/**
 *
 * @author lichangchao
 */
@Configuration
@EnableHazelcastHttpSession(maxInactiveIntervalInSeconds = 30 * 60)
public class SessionConfig {

    @Bean
    public HazelcastInstance embeddedHazelcast() {
        Config hazelcastConfig = new Config();

        return Hazelcast.newHazelcastInstance(hazelcastConfig);
    }

}
