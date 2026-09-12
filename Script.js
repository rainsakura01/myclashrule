// ============================================================
// Clash Verge Rev 全局扩展脚本
// Mihomo v1.19.29
//
// 功能：
// 1. IPv6 优先，IPv6 不可用自动回退 IPv4
// 2. 国内 DNS 直连
// 3. 国外 DNS 强制通过代理
// 4. Fake-IP
// 5. TUN DNS 防泄漏优化
// 6. 除“节点选择”“延迟选优”和“故障转移”外，其余策略组加入 DIRECT
// ============================================================

// ============================================================
// DNS 服务器
// ============================================================
//
// 国内 DNS
const domesticNameservers = [
  "https://dns.alidns.com/dns-query#DIRECT",
  "https://doh.pub/dns-query#DIRECT"
];

// 国外 DNS
// 强制通过“节点选择”代理组访问
const foreignNameservers = [
  "https://1.1.1.1/dns-query#节点选择",
  "https://8.8.8.8/dns-query#节点选择"
];

// ============================================================
// DNS 配置
// ============================================================

const dnsConfig = {
  "enable": true,

  "listen": "0.0.0.0:1053",

  // 开启 IPv6 / AAAA
  "ipv6": true,

  // 不开启 HTTP/3
  "prefer-h3": false,

  // DNS 请求遵循路由规则
  "respect-rules": true,

  "use-system-hosts": false,

  "cache-algorithm": "arc",

  // Fake-IP
  "enhanced-mode": "fake-ip",

  "fake-ip-range": "198.18.0.1/16",

  "fake-ip-filter": [
    "+.lan",
    "+.local",
    "*.local",
    "localhost",

    "+.msftconnecttest.com",
    "+.msftncsi.com",

    "localhost.ptlogin2.qq.com",
    "localhost.sec.qq.com",
    "localhost.work.weixin.qq.com",

    "+.in-addr.arpa",
    "+.ip6.arpa",

    "time.*.com",
    "time.*.gov",
    "pool.ntp.org"
  ],

  // Bootstrap DNS
  "default-nameserver": [
    "223.5.5.5",
    "119.29.29.29"
  ],

  // 默认使用国外 DNS
  // DNS 请求强制从代理节点出去
  "nameserver": [
    ...foreignNameservers
  ],

  // 代理服务器域名解析
  // 在代理建立之前必须可以解析
  "proxy-server-nameserver": [
    ...domesticNameservers
  ],

  // DIRECT 流量使用国内 DNS
  "direct-nameserver": [
    ...domesticNameservers
  ],

  "direct-nameserver-follow-policy": true,

  // 国内和私有域名使用国内 DNS
  "nameserver-policy": {
    "geosite:private,cn": [
      ...domesticNameservers
    ]
  }
};

// ============================================================
// 规则集通用配置
// ============================================================

const ruleProviderCommon = {
  "type": "http",
  "format": "yaml",
  "interval": 86400
};

// ============================================================
// 规则集
// ============================================================

const ruleProviders = {

  "apple-domain": {
    ...ruleProviderCommon,

    "behavior": "domain",

    "url":
      "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/refs/heads/master/rule/Clash/Apple/Apple_Domain.yaml",

    "path":
      "./ruleset/blackmatrix7/Apple_Domain.yaml"
  },

  "apple": {
    ...ruleProviderCommon,

    "behavior": "classical",

    "url":
      "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/refs/heads/master/rule/Clash/Apple/Apple.yaml",

    "path":
      "./ruleset/blackmatrix7/Apple.yaml"
  },

  "google": {
    ...ruleProviderCommon,

    "behavior": "classical",

    "url":
      "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/refs/heads/master/rule/Clash/Google/Google.yaml",

    "path":
      "./ruleset/blackmatrix7/Google.yaml"
  },

  "china": {
    ...ruleProviderCommon,

    "behavior": "classical",

    "url":
      "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/refs/heads/master/rule/Clash/ChinaMax/ChinaMax.yaml",

    "path":
      "./ruleset/blackmatrix7/ChinaMax.yaml"
  },

  "china-domain": {
    ...ruleProviderCommon,

    "behavior": "domain",

    "url":
      "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/refs/heads/master/rule/Clash/ChinaMax/ChinaMax_Domain.yaml",

    "path":
      "./ruleset/blackmatrix7/ChinaMax_Domain.yaml"
  },

  "proxy-domain": {
    ...ruleProviderCommon,

    "behavior": "domain",

    "url":
      "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/refs/heads/master/rule/Clash/Proxy/Proxy_Domain.yaml",

    "path":
      "./ruleset/blackmatrix7/Proxy_domain.yaml"
  },

  "proxy": {
    ...ruleProviderCommon,

    "behavior": "classical",

    "url":
      "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/refs/heads/master/rule/Clash/Proxy/Proxy.yaml",

    "path":
      "./ruleset/blackmatrix7/Proxy.yaml"
  },

  "bahamut": {
    ...ruleProviderCommon,

    "behavior": "classical",

    "url":
      "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/refs/heads/master/rule/Clash/Bahamut/Bahamut.yaml",

    "path":
      "./ruleset/blackmatrix7/Bahamut.yaml"
  },

  "microsoft": {
    ...ruleProviderCommon,

    "behavior": "classical",

    "url":
      "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/refs/heads/master/rule/Clash/Microsoft/Microsoft.yaml",

    "path":
      "./ruleset/blackmatrix7/Microsoft.yaml"
  },

  "steam": {
    ...ruleProviderCommon,

    "behavior": "classical",

    "url":
      "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/refs/heads/master/rule/Clash/Steam/Steam_No_Resolve.yaml",

    "path":
      "./ruleset/blackmatrix7/Steam_No_Resolve.yaml"
  },

  "openai": {
    ...ruleProviderCommon,

    "behavior": "classical",

    "url":
      "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/refs/heads/master/rule/Clash/OpenAI/OpenAI_No_Resolve.yaml",

    "path":
      "./ruleset/blackmatrix7/OpenAI_No_Resolve.yaml"
  },

  "download": {
    ...ruleProviderCommon,

    "behavior": "classical",

    "url":
      "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/refs/heads/master/rule/Clash/Download/Download_No_Resolve.yaml",

    "path":
      "./ruleset/blackmatrix7/Download.yaml"
  },

  "lan": {
    ...ruleProviderCommon,

    "behavior": "classical",

    "url":
      "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/refs/heads/master/rule/Clash/Lan/Lan_No_Resolve.yaml",

    "path":
      "./ruleset/blackmatrix7/lan.yaml"
  }
};

// ============================================================
// 分流规则
// ============================================================

const rules = [

  // ----------------------------------------------------------
  // 特殊服务
  // ----------------------------------------------------------

  "RULE-SET,openai,ChatGPT",

  "RULE-SET,bahamut,动画疯",

  "RULE-SET,google,谷歌服务",

  "RULE-SET,apple-domain,苹果服务",

  "RULE-SET,apple,苹果服务",

  "RULE-SET,microsoft,微软服务",

  "RULE-SET,steam,Steam",

  // ----------------------------------------------------------
  // 国内
  // ----------------------------------------------------------

  "RULE-SET,proxy-domain,节点选择",
  "RULE-SET,proxy,节点选择",

  "RULE-SET,china-domain,猪圈",
  "RULE-SET,china,猪圈",

  // ----------------------------------------------------------
  // 下载
  // ----------------------------------------------------------

  "RULE-SET,download,BT下载",

  // ----------------------------------------------------------
  // LAN
  // ----------------------------------------------------------

  "RULE-SET,lan,DIRECT",

  "GEOIP,LAN,DIRECT,no-resolve",

  // ----------------------------------------------------------
  // 中国 IP
  // ----------------------------------------------------------

  "GEOIP,CN,猪圈",

  // ----------------------------------------------------------
  // 最终
  // ----------------------------------------------------------

  "MATCH,漏网之鱼"
];

// ============================================================
// 策略组通用配置
// ============================================================

const groupBaseOption = {

  "interval": 300,

  "timeout": 3000,

  "url":
    "https://www.gstatic.com/generate_204",

  "lazy": true,

  "max-failed-times": 3,

  "hidden": false
};

// ============================================================
// 主程序
// ============================================================

function main(config) {

  // ----------------------------------------------------------
  // 检查代理节点
  // ----------------------------------------------------------

  const proxyCount =
    config?.proxies?.length ?? 0;

  const proxyProviderCount =
    typeof config?.["proxy-providers"] === "object"
      ? Object.keys(config["proxy-providers"]).length
      : 0;

  if (
    proxyCount === 0 &&
    proxyProviderCount === 0
  ) {

    throw new Error(
      "配置文件中未找到任何代理"
    );
  }

  // ==========================================================
  // 全局 IPv6
  // ==========================================================

  config["ipv6"] = true;

  // IPv6 异常时更快回退 IPv4
  config["tcp-concurrent"] = true;

  // ==========================================================
  // DNS
  // ==========================================================

  config["dns"] = dnsConfig;

  // ==========================================================
  // TUN
  // ==========================================================

  if (
    config["tun"] &&
    typeof config["tun"] === "object"
  ) {

    config["tun"] = {

      ...config["tun"],

      "strict-route": true,

      "dns-hijack": [
        "any:53",
        "tcp://any:53"
      ]
    };
  }

  // ==========================================================
  // 普通 proxies 节点
  // IPv6 优先，失败回退 IPv4
  // ==========================================================

  if (Array.isArray(config.proxies)) {

    config.proxies.forEach(proxy => {

      proxy.udp = true;

      proxy["ip-version"] =
        "ipv6-prefer";
    });
  }

  // ==========================================================
  // Proxy Providers
  // ==========================================================

  if (
    config["proxy-providers"] &&
    typeof config["proxy-providers"] === "object"
  ) {

    Object.values(
      config["proxy-providers"]
    ).forEach(provider => {

      provider.override = {

        ...(provider.override || {}),

        "udp": true,

        "ip-version":
          "ipv6-prefer"
      };
    });
  }

  // ==========================================================
  // 策略组
  // ==========================================================

  config["proxy-groups"] = [

    // ========================================================
    // 节点选择
    // ========================================================

    {
      ...groupBaseOption,

      "name": "节点选择",

      "type": "select",

      "proxies": [
        "延迟选优",
        "故障转移"
      ],

      "include-all": true,

      "icon":
        "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/adjust.svg"
    },

    // ========================================================
    // 延迟选优
    // ========================================================

    {
      ...groupBaseOption,

      "name": "延迟选优",

      "type": "url-test",

      "interval": 300,

      "tolerance": 200,

      "include-all": true,

      "icon":
        "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/speed.svg"
    },

    // ========================================================
    // 故障转移
    // 仅在代理节点之间切换
    // ========================================================

    {
      ...groupBaseOption,

      "name": "故障转移",

      "type": "fallback",

      "include-all": true,

      "icon":
        "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/ambulance.svg"
    },

    // ========================================================
    // Google
    // ========================================================

    {
      ...groupBaseOption,

      "name": "谷歌服务",

      "type": "select",

      "proxies": [
        "节点选择",
        "延迟选优",
        "故障转移",
        "DIRECT"
      ],

      "include-all": true,

      "icon":
        "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/google.svg"
    },

    // ========================================================
    // ChatGPT
    // ========================================================

    {
      ...groupBaseOption,

      "name": "ChatGPT",

      "type": "select",

      "proxies": [
        "节点选择",
        "延迟选优",
        "故障转移",
        "DIRECT"
      ],

      "include-all": true,

      "icon":
        "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/chatgpt.svg"
    },

    // ========================================================
    // Microsoft
    // ========================================================

    {
      ...groupBaseOption,

      "name": "微软服务",

      "type": "select",

      "proxies": [
        "节点选择",
        "延迟选优",
        "DIRECT"
      ],

      "include-all": true,

      "icon":
        "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/microsoft.svg"
    },

    // ========================================================
    // Apple
    // ========================================================

    {
      ...groupBaseOption,

      "name": "苹果服务",

      "type": "select",

      "proxies": [
        "节点选择",
        "延迟选优",
        "故障转移",
        "DIRECT"
      ],

      "include-all": true,

      "icon":
        "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/apple.svg"
    },

    // ========================================================
    // Bahamut
    // ========================================================

    {
      ...groupBaseOption,

      "name": "动画疯",

      "type": "select",

      "proxies": [
        "节点选择",
        "DIRECT"
      ],

      "include-all": true,

      "filter":
        "(?i)台|tw|TW",

      "icon":
        "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Bahamut.png"
    },

    // ========================================================
    // Steam
    // ========================================================

    {
      ...groupBaseOption,

      "name": "Steam",

      "type": "select",

      "proxies": [
        "节点选择",
        "延迟选优",
        "DIRECT"
      ],

      "include-all": true,

      "icon":
        "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/steam.svg"
    },

    // ========================================================
    // BT
    // ========================================================

    {
      ...groupBaseOption,

      "name": "BT下载",

      "type": "select",

      "proxies": [
        "节点选择",
        "延迟选优",
        "DIRECT"
      ],

      "include-all": true,

      "icon":
        "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/balance.svg"
    },

    // ========================================================
    // 猪圈 / 国内
    // DIRECT 保持第一项
    // ========================================================

    {
      ...groupBaseOption,

      "name": "猪圈",

      "type": "select",

      "proxies": [
        "DIRECT",
        "节点选择",
        "延迟选优",
        "故障转移"
      ],

      "include-all": true,

      "icon":
        "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg"
    },

    // ========================================================
    // 漏网之鱼
    // ========================================================

    {
      ...groupBaseOption,

      "name": "漏网之鱼",

      "type": "select",

      "proxies": [
        "节点选择",
        "延迟选优",
        "故障转移",
        "DIRECT"
      ],

      "include-all": true,

      "icon":
        "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/fish.svg"
    }
  ];

  // ==========================================================
  // 规则提供者
  // ==========================================================

  config["rule-providers"] =
    ruleProviders;

  // ==========================================================
  // 规则
  // ==========================================================

  config["rules"] =
    rules;

  return config;
}