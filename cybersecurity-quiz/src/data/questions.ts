export const questions =[
  {
    "question": "What does the acronym XSS stand for in web security?",
    "choices": [
      "Cross-Site Scripting",
      "XML Secure Syntax",
      "Extended Secure Session",
      "External Site Spoofing"
    ],
    "correctAnswers": [0],
    "explanation": "XSS stands for Cross-Site Scripting. It's a security vulnerability that allows an attacker to inject malicious scripts into webpages viewed by other users. These scripts can steal cookies, session tokens, or other sensitive information, and are often executed in the context of the victim's browser."
  },
  {
    "question": "What is the primary purpose of the Content-Security-Policy HTTP header?",
    "choices": [
      "To manage site cookies",
      "To block SQL injection",
      "To restrict resource loading and mitigate XSS",
      "To encrypt data in transit"
    ],
    "correctAnswers": [2],
    "explanation": "The Content-Security-Policy (CSP) header helps prevent a wide range of attacks including Cross-Site Scripting (XSS) and data injection. It defines approved sources of content that browsers should be allowed to load on a page, thereby reducing the risk of malicious content execution."
  },
  {
    "question": "Which tool is commonly used for vulnerability scanning in web apps?",
    "choices": [
      "Wireshark",
      "Metasploit",
      "Burp Suite",
      "Nmap"
    ],
    "correctAnswers": [2],
    "explanation": "Burp Suite is a popular tool for testing the security of web applications. It includes a variety of features such as a proxy server, spidering, vulnerability scanning, and manual testing tools. It is particularly effective in identifying issues like XSS and SQL injection."
  },
  {
    "question": "What is SQL Injection (SQLi)?",
    "choices": [
      "A method to encrypt SQL queries",
      "A technique to execute arbitrary SQL commands via input fields",
      "A tool to improve SQL performance",
      "A type of database indexing"
    ],
    "correctAnswers": [1],
    "explanation": "SQL Injection is a code injection technique that exploits a vulnerability in an application's software by manipulating SQL queries. When user input is not properly sanitized, attackers can craft input to modify the query structure, potentially gaining unauthorized access to or modifying database contents."
  },
  {
    "question": "What does HTTPS guarantee compared to HTTP?",
    "choices": [
      "Faster load times",
      "Data confidentiality and integrity via encryption",
      "Server authentication only",
      "Better SEO ranking"
    ],
    "correctAnswers": [1],
    "explanation": "HTTPS (HyperText Transfer Protocol Secure) uses SSL/TLS to encrypt communications between the browser and the server. This ensures that the data transmitted cannot be read or modified by third parties, protecting sensitive user information."
  },
  {
    "question": "Which OWASP Top 10 vulnerability allows attackers to impersonate users?",
    "choices": [
      "Broken Authentication",
      "Insecure Deserialization",
      "Sensitive Data Exposure",
      "XML External Entities"
    ],
    "correctAnswers": [0],
    "explanation": "Broken Authentication refers to flaws that allow attackers to compromise user credentials or session tokens. If not properly handled, these flaws can let attackers impersonate legitimate users, gaining unauthorized access to systems and data."
  },
  {
    "question": "Why is input validation important in web development?",
    "choices": [
      "To improve frontend performance",
      "To prevent layout shifts",
      "To prevent malicious input like XSS or SQLi",
      "To increase SEO score"
    ],
    "correctAnswers": [2],
    "explanation": "Input validation ensures that user inputs conform to expected formats and constraints. It's a fundamental security practice to prevent injection attacks such as SQLi or XSS, where attackers try to manipulate application behavior by submitting malicious input."
  },
  {
    "question": "What is the main function of a Web Application Firewall (WAF)?",
    "choices": [
      "Encrypt database files",
      "Monitor server temperature",
      "Filter and monitor HTTP traffic",
      "Optimize website loading time"
    ],
    "correctAnswers": [2],
    "explanation": "A Web Application Firewall (WAF) protects web applications by filtering and monitoring HTTP traffic between a web application and the internet. It helps mitigate common attacks such as XSS, SQL injection, and file inclusion by enforcing security rules."
  },
  {
    "question": "What kind of attack does the Same-Origin Policy help prevent?",
    "choices": [
      "Man-in-the-middle",
      "Cross-site scripting",
      "Cross-site request forgery",
      "Brute-force"
    ],
    "correctAnswers": [2],
    "explanation": "The Same-Origin Policy is a critical security mechanism that restricts how a document or script loaded from one origin can interact with resources from another origin. It helps prevent Cross-Site Request Forgery (CSRF) by disallowing unauthorized access to sensitive APIs from malicious sites."
  },
  {
    "question": "Which HTTP header can help mitigate clickjacking attacks?",
    "choices": [
      "X-Frame-Options",
      "X-Content-Type-Options",
      "X-XSS-Protection",
      "Strict-Transport-Security"
    ],
    "correctAnswers": [0],
    "explanation": "The X-Frame-Options header prevents a webpage from being displayed in a frame, iframe, or object tag. This helps defend against clickjacking, where an attacker tricks a user into clicking something different than what the user perceives, potentially executing unwanted actions."
  },


  {
  "question": "What is a common method for attackers to exfiltrate data from a vulnerable SQL database?",
  "choices": [
    "Using DNS tunneling",
    "Injecting a DROP TABLE command",
    "SELECTing sensitive data with UNION",
    "Brute-forcing table names"
  ],
  "correctAnswers": [2],
  "explanation": "A common method to extract data during a SQL injection attack is to use the UNION SELECT command, which allows combining the results of two queries. If not properly sanitized, attackers can use this to retrieve sensitive information such as usernames, passwords, or credit card numbers."
},
{
  "question": "What does the 'Secure' attribute on a cookie do?",
  "choices": [
    "Encrypts the cookie content",
    "Prevents access via JavaScript",
    "Allows cookie transmission only over HTTPS",
    "Ensures cookie is valid only on login pages"
  ],
  "correctAnswers": [2],
  "explanation": "The 'Secure' attribute tells the browser to only send the cookie over HTTPS connections, protecting it from being intercepted over unencrypted HTTP. This is essential for protecting session cookies from being exposed during transmission."
},
{
  "question": "What is a 'zero-day' vulnerability?",
  "choices": [
    "A vulnerability known to the public for zero days",
    "A patch that fixes a critical bug",
    "A vulnerability that only affects Linux systems",
    "A harmless bug found in a security audit"
  ],
  "correctAnswers": [0],
  "explanation": "A zero-day vulnerability is a flaw in software that is unknown to the vendor and has no patch available. Since no fix exists, it poses a high security risk, especially if attackers are already exploiting it in the wild before detection or disclosure."
},
{
  "question": "Why is Base64 encoding not considered secure encryption?",
  "choices": [
    "Because it's easily reversible",
    "Because it uses outdated algorithms",
    "Because it's a one-way hash",
    "Because it compresses data, not encrypts"
  ],
  "correctAnswers": [0],
  "explanation": "Base64 is an encoding scheme used to represent binary data as ASCII text. It is not encryption and provides no confidentiality. Anyone can decode Base64 easily, so it should never be used for protecting sensitive information."
},
{
  "question": "What does a 403 HTTP status code mean?",
  "choices": [
    "Not Found",
    "Access Forbidden",
    "Temporary Redirect",
    "Unauthorized"
  ],
  "correctAnswers": [1],
  "explanation": "A 403 Forbidden status means the server understood the request but refuses to authorize it. Unlike a 401 Unauthorized, authentication will not help in this case. It's typically used when permissions are insufficient to access a resource."
},
{
  "question": "What kind of risk does an open S3 bucket present?",
  "choices": [
    "XSS injection risk",
    "DoS vulnerability",
    "Data exposure",
    "SQL injection attack"
  ],
  "correctAnswers": [2],
  "explanation": "An open Amazon S3 bucket means its contents are publicly accessible. If it contains sensitive data (e.g., user files, backups, credentials), it can be downloaded by anyone. This is a common misconfiguration that leads to data breaches."
},
{
  "question": "What is the primary function of input sanitization?",
  "choices": [
    "Improve form UX",
    "Prevent malformed HTML",
    "Remove potentially dangerous characters from user input",
    "Encrypt sensitive fields"
  ],
  "correctAnswers": [2],
  "explanation": "Input sanitization involves removing or escaping characters from user input that could be used in attacks, such as SQL injection or XSS. It helps ensure the input is safe before being processed by the backend or rendered in the frontend."
},
{
  "question": "How does CSRF (Cross-Site Request Forgery) work?",
  "choices": [
    "It redirects users to fake login pages",
    "It injects malicious scripts into web pages",
    "It forces authenticated users to unknowingly submit unwanted actions",
    "It encrypts user data for ransom"
  ],
  "correctAnswers": [2],
  "explanation": "CSRF tricks an authenticated user into submitting a malicious request to a web application, like changing a password or transferring funds. Since the request is sent from the user's browser with a valid session, the server accepts it, thinking it's legitimate."
},
{
  "question": "What’s the role of SameSite cookies?",
  "choices": [
    "They prevent cookies from being stored in the browser cache",
    "They prevent cookies from being used in cross-origin requests",
    "They encrypt cookies during transmission",
    "They expire cookies immediately"
  ],
  "correctAnswers": [1],
  "explanation": "The SameSite cookie attribute restricts when cookies are sent with cross-origin requests. Setting SameSite to 'Strict' or 'Lax' helps mitigate CSRF by ensuring cookies are not sent with cross-site requests, thereby protecting user sessions."
},
{
  "question": "Which of the following is a key component of the CIA triad in cybersecurity?",
  "choices": [
    "Auditability",
    "Availability",
    "Authentication",
    "Access control"
  ],
  "correctAnswers": [1],
  "explanation": "The CIA triad stands for Confidentiality, Integrity, and Availability — three core principles of cybersecurity. 'Availability' ensures systems and data are accessible when needed, particularly during disruptions or attacks like DoS."
},
{
  "question": "What is the primary purpose of a WAF (Web Application Firewall)?",
  "choices": [
    "To block malware downloads",
    "To protect databases from corruption",
    "To filter and monitor HTTP traffic to and from a web application",
    "To prevent unauthorized SSH access"
  ],
  "correctAnswers": [2],
  "explanation": "A Web Application Firewall (WAF) inspects HTTP traffic between a web application and the internet. It helps protect against common web exploits such as SQL injection, cross-site scripting (XSS), and other OWASP Top 10 threats by filtering out malicious requests."
},
{
  "question": "What kind of threat does an exposed .git folder in a web server represent?",
  "choices": [
    "Session hijacking",
    "Source code leakage",
    "Brute-force login attacks",
    "Unpatched software risk"
  ],
  "correctAnswers": [1],
  "explanation": "An exposed `.git` folder allows attackers to access the full version history of the application's source code. This may include sensitive information such as hardcoded credentials, internal logic, or unpatched vulnerabilities that could be exploited."
},
{
  "question": "Why is it dangerous to allow file uploads without validating the file type?",
  "choices": [
    "It increases server load",
    "It enables SQL injection attacks",
    "It allows execution of malicious files like web shells",
    "It disrupts SEO performance"
  ],
  "correctAnswers": [2],
  "explanation": "Allowing unrestricted file uploads can enable attackers to upload executable scripts (like PHP web shells) disguised with image or text file extensions. If executed on the server, these files could grant full remote control or access to sensitive data."
},
{
  "question": "Which of the following best describes an XSS (Cross-Site Scripting) attack?",
  "choices": [
    "Injecting malicious scripts into trusted websites",
    "Intercepting network traffic using spoofed DNS",
    "Bypassing authentication using SQL queries",
    "Encrypting files to demand ransom"
  ],
  "correctAnswers": [0],
  "explanation": "XSS attacks involve injecting malicious JavaScript into webpages viewed by other users. When these scripts run in the victims' browsers, attackers can steal cookies, hijack sessions, redirect users, or display fake content."
},
{
  "question": "Why is it risky to trust the 'Referer' header for authentication?",
  "choices": [
    "Because it can be empty or spoofed by attackers",
    "Because it uses too much bandwidth",
    "Because it's encrypted and unreadable",
    "Because it’s only supported in Firefox"
  ],
  "correctAnswers": [0],
  "explanation": "The 'Referer' header can be easily manipulated or omitted by the client. Relying on it for authentication or security controls is insecure, as attackers can spoof it or suppress it entirely to bypass access restrictions."
},
{
  "question": "What does an HTTP 500 status code usually indicate?",
  "choices": [
    "Client sent a malformed request",
    "Page not found",
    "Internal server error",
    "Unauthorized access attempt"
  ],
  "correctAnswers": [2],
  "explanation": "An HTTP 500 status code means the server encountered an unexpected condition that prevented it from fulfilling the request. This typically indicates an error in server-side code, misconfiguration, or unhandled exceptions."
},
{
  "question": "Which attack manipulates user input to execute commands on the server’s OS?",
  "choices": [
    "SQL Injection",
    "XSS",
    "Command Injection",
    "Path Traversal"
  ],
  "correctAnswers": [2],
  "explanation": "Command injection allows attackers to inject and execute arbitrary system-level commands on the server. It typically exploits poor input validation in functions that pass input directly to shell commands, leading to full system compromise."
},
{
  "question": "Why is it important to implement rate limiting on login endpoints?",
  "choices": [
    "To prevent duplicate account creation",
    "To reduce email spam",
    "To mitigate brute-force attacks",
    "To improve SEO"
  ],
  "correctAnswers": [2],
  "explanation": "Rate limiting helps prevent attackers from trying an unlimited number of password combinations by slowing or blocking repeated login attempts. It is a critical defense against brute-force and credential stuffing attacks."
},
{
  "question": "Which HTTP method is considered safe and idempotent?",
  "choices": [
    "POST",
    "PUT",
    "GET",
    "DELETE"
  ],
  "correctAnswers": [2],
  "explanation": "GET requests are designed to retrieve data without causing any side effects. They are considered safe and idempotent, meaning repeated calls will produce the same result without altering the server state, unlike POST or DELETE."
},
{
  "question": "What is the main risk of exposing stack traces to users in error messages?",
  "choices": [
    "It makes the site slower",
    "It reveals server-side logic and sensitive paths",
    "It breaks the CSS styling",
    "It improves SEO ranking"
  ],
  "correctAnswers": [1],
  "explanation": "Exposing stack traces in production environments gives attackers insight into the server's backend structure, file paths, libraries used, and potentially sensitive variables. This can be leveraged in targeted attacks or exploit development."
},
{
  "question": "What is the purpose of the 'Content-Security-Policy' HTTP header?",
  "choices": [
    "To control who can access the website",
    "To specify allowed sources for content like scripts and images",
    "To enforce password complexity requirements",
    "To log user activity"
  ],
  "correctAnswers": [1],
  "explanation": "The 'Content-Security-Policy' (CSP) header helps mitigate XSS and data injection attacks by defining which sources of content (scripts, styles, images, etc.) are trusted. For example, it can block inline scripts or third-party resources unless explicitly allowed."
},
{
  "question": "What does the term 'Least Privilege' refer to in cybersecurity?",
  "choices": [
    "Giving users admin rights to reduce support requests",
    "Restricting access so users only have the permissions necessary for their role",
    "Enabling all ports by default",
    "Allowing anyone to access the public web directory"
  ],
  "correctAnswers": [1],
  "explanation": "The principle of Least Privilege involves granting users or systems the minimum level of access—or permissions—necessary to perform their duties. This reduces the attack surface and limits potential damage from compromised accounts."
},
{
  "question": "What kind of attack does the OWASP term 'Broken Authentication' refer to?",
  "choices": [
    "Failing to redirect HTTP to HTTPS",
    "Improper implementation of login/logout functionality that can be exploited",
    "Allowing users to reuse old passwords",
    "Crashing the server via malformed packets"
  ],
  "correctAnswers": [1],
  "explanation": "Broken Authentication refers to flaws in identity and session management that can allow attackers to compromise passwords, keys, or session tokens. Examples include exposed session IDs, missing logout, or insecure credential storage."
},
{
  "question": "Which port is commonly used for HTTPS traffic?",
  "choices": [
    "80",
    "21",
    "443",
    "25"
  ],
  "correctAnswers": [2],
  "explanation": "Port 443 is the standard port for HTTPS, which is HTTP over TLS/SSL. This ensures that data transmitted between the client and server is encrypted and secure from interception or tampering."
},
{
  "question": "What does SQL Injection allow an attacker to do?",
  "choices": [
    "Inject CSS code into the page",
    "Execute arbitrary SQL queries on the database",
    "Bypass firewalls",
    "Redirect traffic to another domain"
  ],
  "correctAnswers": [1],
  "explanation": "SQL Injection vulnerabilities allow attackers to manipulate SQL queries executed by the application. This can lead to data theft, modification, deletion, or even remote code execution depending on the database privileges."
},
{
  "question": "What is the role of a CAPTCHA on a login or signup page?",
  "choices": [
    "To detect SQL injection",
    "To protect against automated bots",
    "To log user IP addresses",
    "To encrypt form submissions"
  ],
  "correctAnswers": [1],
  "explanation": "CAPTCHAs are used to distinguish between human users and bots. They protect against automated attacks like credential stuffing, fake account creation, and denial-of-service attempts by requiring users to complete challenges that bots can't solve."
},
{
  "question": "What does directory traversal allow an attacker to do?",
  "choices": [
    "Delete the database",
    "Inject JavaScript into HTML files",
    "Access files outside the intended directory structure",
    "Reset admin credentials"
  ],
  "correctAnswers": [2],
  "explanation": "Directory traversal exploits improper validation of user-supplied paths, enabling attackers to navigate outside the intended folder structure (e.g., using `../`). This can lead to exposure of sensitive files like `/etc/passwd` or application config files."
},
{
  "question": "What is a subdomain takeover?",
  "choices": [
    "A phishing attack using a similar domain",
    "Exploiting expired DNS records to control a subdomain",
    "Hijacking DNS by changing registrar settings",
    "Injecting code into a CDN"
  ],
  "correctAnswers": [1],
  "explanation": "A subdomain takeover occurs when a subdomain (e.g., `blog.example.com`) points to a third-party service (like GitHub Pages or Heroku) that has been decommissioned but not removed from DNS. An attacker can claim the service and host malicious content."
},
{
  "question": "What does HTTPS protect against?",
  "choices": [
    "Malware installation",
    "Server misconfiguration",
    "Eavesdropping and man-in-the-middle attacks",
    "SQL injection"
  ],
  "correctAnswers": [2],
  "explanation": "HTTPS encrypts data exchanged between the user's browser and the server, making it unreadable to third parties. This prevents eavesdropping, tampering, and man-in-the-middle (MITM) attacks on insecure networks."
},
{
  "question": "Why should you not use 'admin' as a default username?",
  "choices": [
    "It violates naming conventions",
    "It triggers antivirus alerts",
    "It is commonly targeted in brute-force attacks",
    "It prevents password resets"
  ],
  "correctAnswers": [2],
  "explanation": "Using common usernames like 'admin' makes brute-force attacks easier because attackers already know the login ID. This reduces the attacker's workload by half, leaving only the password to guess. A unique admin username increases security."
},
{
  "question": "Which of the following is a common symptom of a Cross-Site Scripting (XSS) vulnerability?",
  "choices": [
    "The page takes too long to load",
    "Unexpected JavaScript execution in the browser",
    "Loss of data due to backup failure",
    "The server crashes under high load"
  ],
  "correctAnswers": [1],
  "explanation": "XSS allows an attacker to inject and execute malicious scripts in the browser of a victim. If input isn’t sanitized, attackers can inject JavaScript that runs when the page loads or when a user interacts with it, often stealing cookies or user credentials."
},
{
  "question": "What does the Same-Origin Policy (SOP) protect against?",
  "choices": [
    "Brute force login attempts",
    "Unauthorized cross-site access to resources",
    "Malware installation",
    "Internal port scanning"
  ],
  "correctAnswers": [1],
  "explanation": "The Same-Origin Policy restricts how a document or script loaded from one origin can interact with resources from another origin. This prevents malicious sites from reading sensitive data from other domains via JavaScript."
},
{
  "question": "Why is it important to hash passwords before storing them?",
  "choices": [
    "To save disk space",
    "To improve login performance",
    "To protect against credential theft if the database is compromised",
    "To comply with browser caching rules"
  ],
  "correctAnswers": [2],
  "explanation": "Hashing passwords using algorithms like bcrypt, scrypt, or Argon2 ensures that even if the database is compromised, attackers cannot easily retrieve the original passwords. Hashes are one-way functions and should be salted to further increase security."
},
{
  "question": "What is the goal of a Denial-of-Service (DoS) attack?",
  "choices": [
    "To steal user credentials",
    "To execute code remotely",
    "To make a service unavailable to users",
    "To inject SQL commands"
  ],
  "correctAnswers": [2],
  "explanation": "A Denial-of-Service (DoS) attack overwhelms a system’s resources—CPU, memory, or bandwidth—making it unavailable to legitimate users. This can be achieved through traffic floods, resource exhaustion, or exploiting software bugs."
},
{
  "question": "What is an example of a weak authentication practice?",
  "choices": [
    "Using multi-factor authentication",
    "Enforcing complex password requirements",
    "Allowing default credentials to remain active",
    "Locking accounts after failed login attempts"
  ],
  "correctAnswers": [2],
  "explanation": "Leaving default credentials (like 'admin:admin') unchanged is a major security risk. Attackers often scan for such weaknesses using automated tools. All default accounts should be changed or disabled during deployment."
},
{
  "question": "Which of the following can prevent SQL Injection attacks?",
  "choices": [
    "Input masking",
    "Using prepared statements with parameterized queries",
    "Disabling JavaScript in forms",
    "Using Base64 encoding on inputs"
  ],
  "correctAnswers": [1],
  "explanation": "Prepared statements and parameterized queries separate SQL code from data. This ensures that user input is treated strictly as data and not executable SQL, effectively preventing injection attacks regardless of input content."
},
{
  "question": "Why should you avoid using the GET method for login forms?",
  "choices": [
    "GET requests are slower than POST",
    "GET can be cached by browsers",
    "GET exposes sensitive data in the URL",
    "GET doesn't support encryption"
  ],
  "correctAnswers": [2],
  "explanation": "Using GET for login forms exposes sensitive data like usernames and passwords in the URL, which can be logged in browser history or server logs. POST should always be used for transmitting sensitive information."
},
{
  "question": "Which HTTP status code indicates unauthorized access?",
  "choices": [
    "200",
    "301",
    "401",
    "503"
  ],
  "correctAnswers": [2],
  "explanation": "A 401 Unauthorized status code means the client request lacks valid authentication credentials. It is often used in API responses or protected pages requiring a login. This is different from 403, which means 'forbidden' even with authentication."
},
{
  "question": "What is the main advantage of a Web Application Firewall (WAF)?",
  "choices": [
    "It reduces disk usage",
    "It compresses HTTP traffic",
    "It filters and blocks malicious HTTP traffic before it reaches the server",
    "It balances load across servers"
  ],
  "correctAnswers": [2],
  "explanation": "A WAF monitors and filters incoming HTTP/HTTPS traffic to detect and block malicious payloads such as SQL injection, XSS, or path traversal. It adds a layer of defense between the client and the application, improving overall security posture."
},
{
  "question": "What is the primary danger of using outdated software components?",
  "choices": [
    "They are incompatible with HTTPS",
    "They slow down the UI",
    "They may contain known vulnerabilities exploitable by attackers",
    "They increase server energy usage"
  ],
  "correctAnswers": [2],
  "explanation": "Outdated components may have publicly known vulnerabilities that attackers can exploit using automated tools. Keeping software up-to-date with security patches is critical to closing known security holes and reducing the attack surface."
},
{
  "question": "What does the 'principle of least privilege' imply in cybersecurity?",
  "choices": [
    "Users should never change their passwords",
    "Give users full access by default and reduce later",
    "Users should have only the access necessary to perform their tasks",
    "Privileges should be assigned based on job seniority"
  ],
  "correctAnswers": [2],
  "explanation": "The principle of least privilege ensures users and systems have only the minimum access rights they need to perform their tasks. This minimizes the potential damage in case of an account compromise and reduces the attack surface."
},
{
  "question": "Which type of attack is mitigated by using HTTPS?",
  "choices": [
    "SQL Injection",
    "Cross-Site Scripting (XSS)",
    "Man-in-the-Middle (MitM)",
    "Denial-of-Service (DoS)"
  ],
  "correctAnswers": [2],
  "explanation": "HTTPS encrypts the communication between a client and server, preventing attackers from intercepting or modifying the data in transit. This helps mitigate Man-in-the-Middle (MitM) attacks, where an attacker eavesdrops or alters data."
},
{
  "question": "What is a security risk of using outdated TLS versions such as TLS 1.0?",
  "choices": [
    "They use too much bandwidth",
    "They are incompatible with most proxies",
    "They have known vulnerabilities that can be exploited",
    "They slow down password hashing"
  ],
  "correctAnswers": [2],
  "explanation": "Old TLS versions (like TLS 1.0 or 1.1) are vulnerable to attacks like BEAST or POODLE. They lack modern cryptographic protections, making encrypted communications insecure. They should be disabled in favor of TLS 1.2 or TLS 1.3."
},
{
  "question": "Which HTTP header helps prevent clickjacking?",
  "choices": [
    "Content-Type",
    "X-Frame-Options",
    "Access-Control-Allow-Origin",
    "Strict-Transport-Security"
  ],
  "correctAnswers": [1],
  "explanation": "The `X-Frame-Options` header controls whether a browser should be allowed to render a page inside a `<frame>` or `<iframe>`. Setting it to `DENY` or `SAMEORIGIN` prevents attackers from embedding your site in another to trick users."
},
{
  "question": "What is the purpose of salting in password storage?",
  "choices": [
    "To prevent password reuse",
    "To improve encryption speed",
    "To prevent rainbow table attacks",
    "To simplify password reset"
  ],
  "correctAnswers": [2],
  "explanation": "A salt is a unique, random string added to each password before hashing. It ensures that identical passwords result in different hashes and makes precomputed attacks (like rainbow tables) ineffective. Each user’s password should be salted uniquely."
},
{
  "question": "What role does input validation play in web security?",
  "choices": [
    "It improves rendering speed",
    "It ensures only safe and expected data is processed",
    "It disables pop-ups",
    "It encrypts the user input"
  ],
  "correctAnswers": [1],
  "explanation": "Input validation ensures that data entered by users is clean, properly formatted, and within expected bounds. It helps prevent injection attacks (e.g. SQLi, XSS) by rejecting harmful or malformed input before it reaches critical logic."
},
{
  "question": "What is the purpose of a Content Security Policy (CSP)?",
  "choices": [
    "To prevent brute force attacks",
    "To manage cookie expiration",
    "To control the sources from which scripts, styles, and other content can be loaded",
    "To enforce SSL connections"
  ],
  "correctAnswers": [2],
  "explanation": "CSP is an HTTP header that helps prevent XSS and data injection attacks by defining a whitelist of trusted sources for scripts, styles, images, and other content. It limits what a browser can load and execute on the page."
},
{
  "question": "Which method is best for securely storing API keys in a frontend web application?",
  "choices": [
    "Directly in JavaScript files",
    "In HTML meta tags",
    "They should not be stored in the frontend at all",
    "Using base64 encoding"
  ],
  "correctAnswers": [2],
  "explanation": "API keys should not be exposed in frontend applications since they can be easily accessed by users or attackers via browser developer tools. Instead, sensitive keys should be stored securely on a backend server and accessed through proxy endpoints."
},
{
  "question": "What does Two-Factor Authentication (2FA) add to the login process?",
  "choices": [
    "Faster login speed",
    "Biometric verification only",
    "An additional layer of identity verification",
    "Better UI experience"
  ],
  "correctAnswers": [2],
  "explanation": "2FA adds an extra step in the authentication process, requiring something you know (like a password) and something you have (like a smartphone or token). This significantly reduces the risk of account compromise even if the password is leaked."
},
{
  "question": "What kind of attack exploits user trust in a legitimate website’s reputation?",
  "choices": [
    "Brute force attack",
    "Watering hole attack",
    "DDoS attack",
    "Buffer overflow"
  ],
  "correctAnswers": [1],
  "explanation": "A watering hole attack involves compromising a website frequently visited by the target audience, injecting malware or exploits there. It banks on users’ trust in the site’s reputation to deliver its payload silently and efficiently."
},
{
  "question": "What is the main security concern with using shared hosting for web applications?",
  "choices": [
    "Limited disk space",
    "Shared IP addresses reduce SEO ranking",
    "Other tenants can potentially exploit vulnerabilities to access your data",
    "It’s more expensive than dedicated hosting"
  ],
  "correctAnswers": [2],
  "explanation": "In shared hosting, multiple users share the same server resources. If one website is compromised, an attacker might gain access to neighboring sites by exploiting misconfigurations or vulnerabilities in the server setup. Isolation between tenants is often weak."
},
{
  "question": "What is the purpose of the SameSite attribute in cookies?",
  "choices": [
    "It encrypts the cookie value",
    "It allows JavaScript to modify cookies",
    "It prevents cookies from being sent in cross-site requests",
    "It sets the cookie expiration date"
  ],
  "correctAnswers": [2],
  "explanation": "The SameSite attribute in cookies controls whether a cookie is sent along with cross-site requests. Setting it to 'Strict' or 'Lax' helps prevent Cross-Site Request Forgery (CSRF) attacks by ensuring cookies are not automatically sent across origins."
},
{
  "question": "Why is it insecure to disable browser XSS protection via headers?",
  "choices": [
    "It makes the page load slower",
    "It prevents HTTPS from working",
    "It disables the browser’s ability to block reflected XSS attacks",
    "It reduces SEO rankings"
  ],
  "correctAnswers": [2],
  "explanation": "Disabling XSS protection with headers like `X-XSS-Protection: 0` removes a browser's built-in mitigation against reflected XSS. This protection helps detect and neutralize simple XSS vectors that may be overlooked by developers."
},
{
  "question": "Which of the following is a common sign of a SQL injection vulnerability?",
  "choices": [
    "Page loads slowly on mobile",
    "Unusual error messages when special characters are entered",
    "High CPU usage on the server",
    "Broken image links on the webpage"
  ],
  "correctAnswers": [1],
  "explanation": "SQL injection vulnerabilities often reveal themselves when inputs like `' OR 1=1--` or `'` cause errors such as syntax errors or database tracebacks. This indicates that user input is being directly used in SQL queries without sanitization."
},
{
  "question": "What makes JSON Web Tokens (JWT) vulnerable when using the 'none' algorithm?",
  "choices": [
    "It encrypts data instead of signing it",
    "It allows anyone to modify the token without a signature",
    "It uses weak hashing algorithms",
    "It stores data in plaintext"
  ],
  "correctAnswers": [1],
  "explanation": "Using the 'none' algorithm in JWTs disables signature verification, allowing an attacker to tamper with the payload without detection. This flaw can be exploited if a server incorrectly accepts unsigned tokens as valid."
},
{
  "question": "What is the role of a Web Application Firewall (WAF)?",
  "choices": [
    "It scans for viruses in attachments",
    "It prevents brute force attacks by locking accounts",
    "It monitors and filters HTTP traffic to and from a web application",
    "It manages SSL certificates"
  ],
  "correctAnswers": [2],
  "explanation": "A WAF analyzes, filters, and blocks HTTP(S) traffic to web applications to protect against attacks like XSS, SQLi, and CSRF. It acts as a reverse proxy and sits between the user and the web server to inspect every request and response."
},
{
  "question": "Which of the following is a risk of failing to implement proper CORS configuration?",
  "choices": [
    "Your site becomes slower",
    "Attackers can read sensitive data from API responses in cross-origin contexts",
    "Users cannot log in",
    "SSL certificates expire faster"
  ],
  "correctAnswers": [1],
  "explanation": "Improper Cross-Origin Resource Sharing (CORS) configuration can expose APIs to unauthorized domains, allowing attackers to send requests and read responses from a user’s browser, potentially accessing private data or tokens."
},
{
  "question": "What is a supply chain attack?",
  "choices": [
    "An attack on a logistics company",
    "A brute-force password attack on cloud servers",
    "Compromising software dependencies or vendors to introduce malicious code",
    "Sending phishing emails with fake invoices"
  ],
  "correctAnswers": [2],
  "explanation": "A supply chain attack targets third-party software or dependencies that a project relies on. Attackers inject malicious code or backdoors into libraries, packages, or vendor services, which then get distributed to end-users unknowingly."
},
{
  "question": "How can attackers use Cross-Site Scripting (XSS) to steal session tokens?",
  "choices": [
    "By modifying cookies on the server",
    "By injecting scripts that read `document.cookie` and exfiltrate it",
    "By guessing the token through brute force",
    "By disabling SSL certificates"
  ],
  "correctAnswers": [1],
  "explanation": "In an XSS attack, the attacker injects malicious JavaScript into a page viewed by another user. This script can access `document.cookie`, retrieve the session token, and send it to the attacker's server—allowing session hijacking."
},
{
  "question": "Which protocol is used to ensure email authenticity and reduce spoofing?",
  "choices": [
    "HTTPS",
    "SSL",
    "DKIM",
    "DNS"
  ],
  "correctAnswers": [2],
  "explanation": "DKIM (DomainKeys Identified Mail) is an email authentication method that allows the receiver to verify that an email was authorized by the domain owner. It uses digital signatures in the headers to prevent spoofing and tampering."
},
{
  "question": "What is the main purpose of a Content Security Policy (CSP)?",
  "choices": [
    "To compress web assets",
    "To control which resources the browser is allowed to load",
    "To encrypt data in transit",
    "To enforce cookie expiration policies"
  ],
  "correctAnswers": [1],
  "explanation": "A Content Security Policy (CSP) is a browser security feature that restricts the sources from which content (such as scripts, images, styles) can be loaded. This helps mitigate attacks like Cross-Site Scripting (XSS) by blocking malicious resources injected into the page."
},
{
  "question": "Which OWASP Top 10 category includes data being exposed due to insufficient encryption?",
  "choices": [
    "A1: Injection",
    "A2: Broken Authentication",
    "A3: Sensitive Data Exposure",
    "A4: XML External Entities"
  ],
  "correctAnswers": [2],
  "explanation": "Sensitive Data Exposure refers to situations where confidential data (e.g., passwords, credit card numbers, health records) is not properly protected. This can happen due to weak or no encryption, poor key management, or transmission over unprotected channels."
},
{
  "question": "Why is storing passwords in plaintext a serious security issue?",
  "choices": [
    "It uses more database space",
    "It requires more server processing",
    "It allows anyone with database access to see all user passwords",
    "It makes password reset impossible"
  ],
  "correctAnswers": [2],
  "explanation": "Plaintext passwords expose users to immediate risk if the database is ever compromised. Any attacker can instantly read all user credentials. Best practices involve hashing (e.g., bcrypt, Argon2) and salting passwords before storage."
},
{
  "question": "What does the term 'zero-day vulnerability' refer to?",
  "choices": [
    "A vulnerability discovered by users",
    "A vulnerability that has existed for more than 10 years",
    "A vulnerability that is publicly known but has no patch",
    "A vulnerability actively exploited before developers are aware of it"
  ],
  "correctAnswers": [3],
  "explanation": "A zero-day vulnerability is a security flaw that is unknown to the software vendor. Since there's no patch or fix available, attackers can exploit it immediately, making it highly dangerous. The term reflects the 'zero days' developers had to fix it."
},
{
  "question": "Which of the following is the best defense against SQL injection?",
  "choices": [
    "Input validation using regex",
    "Escaping all user input",
    "Using parameterized queries (prepared statements)",
    "Disabling SQL logging"
  ],
  "correctAnswers": [2],
  "explanation": "Parameterized queries ensure that user input is treated as data, not executable code, effectively preventing SQL injection. They bind variables instead of concatenating strings, which makes it impossible to alter query logic via user input."
},
{
  "question": "What is the role of HSTS (HTTP Strict Transport Security)?",
  "choices": [
    "It increases SEO ranking",
    "It ensures all communications are made over HTTPS",
    "It hides the server technology used",
    "It prevents DDoS attacks"
  ],
  "correctAnswers": [1],
  "explanation": "HSTS forces browsers to use HTTPS connections only. Once a browser receives the HSTS header, it will refuse to load the site over HTTP, protecting against downgrade attacks and cookie hijacking over insecure connections."
},
{
  "question": "Which of these methods helps prevent session fixation attacks?",
  "choices": [
    "Using the same session ID after login",
    "Regenerating session ID after authentication",
    "Storing session ID in localStorage",
    "Disabling cookies"
  ],
  "correctAnswers": [1],
  "explanation": "Session fixation occurs when an attacker sets a known session ID for a user and waits for them to log in. Regenerating the session ID upon login ensures that a new, unique ID is assigned and the attacker cannot hijack the session."
},
{
  "question": "Which type of attack is most commonly mitigated by input sanitization?",
  "choices": [
    "Man-in-the-middle (MitM)",
    "XSS (Cross-Site Scripting)",
    "Brute force",
    "DDoS"
  ],
  "correctAnswers": [1],
  "explanation": "Input sanitization removes or escapes dangerous characters from user input, making it safe to render on a webpage. This is critical in preventing XSS attacks, where malicious scripts are injected into web pages viewed by others."
},
{
  "question": "What does the 'least privilege principle' mean in cybersecurity?",
  "choices": [
    "Users should have access to everything during testing",
    "Each user has maximum privileges temporarily",
    "Users and processes have only the permissions needed to perform their tasks",
    "Admin accounts are used for all operations"
  ],
  "correctAnswers": [2],
  "explanation": "The principle of least privilege ensures users, systems, and applications operate using the minimum access rights required. This reduces the potential impact of a compromise or error by limiting access to sensitive data and critical systems."
},
{
  "question": "Why are error messages a potential security risk?",
  "choices": [
    "They slow down the site",
    "They can reveal system details like stack traces or database errors",
    "They are difficult to localize",
    "They interfere with user input"
  ],
  "correctAnswers": [1],
  "explanation": "Overly detailed error messages can disclose sensitive internal information (e.g., file paths, database structure, software versions) that attackers use to craft targeted exploits. Error handling should be user-friendly but not verbose."
},
{
  "question": "What is a CSRF (Cross-Site Request Forgery) attack?",
  "choices": [
    "An attack that injects malicious JavaScript",
    "An attack that forces a user to perform actions without their consent",
    "An attack exploiting weak password policies",
    "An attack that targets DNS resolution"
  ],
  "correctAnswers": [1],
  "explanation": "CSRF tricks an authenticated user into unknowingly submitting a request to a web application where they’re already logged in. For example, clicking a hidden form on a malicious site could trigger actions (like changing email or transferring funds) on another site without the user’s knowledge."
},
{
  "question": "Which response header can prevent your site from being embedded in an iframe?",
  "choices": [
    "X-Frame-Options",
    "Content-Type",
    "X-Content-Type-Options",
    "Strict-Transport-Security"
  ],
  "correctAnswers": [0],
  "explanation": "The `X-Frame-Options` HTTP header controls whether a browser allows a page to be displayed in an `<iframe>`. This is crucial to prevent clickjacking attacks. Common values are `DENY`, `SAMEORIGIN`, and `ALLOW-FROM`."
},
{
  "question": "What is the main difference between authentication and authorization?",
  "choices": [
    "Authentication checks permissions, authorization verifies identity",
    "Authentication verifies identity, authorization checks access permissions",
    "They are synonyms",
    "Authentication is about data encryption, authorization is about compression"
  ],
  "correctAnswers": [1],
  "explanation": "Authentication is the process of confirming a user’s identity (e.g., login with username and password), while authorization determines what that user is allowed to do (e.g., access admin panel). Both are essential parts of access control."
},
{
  "question": "What is a secure alternative to storing session IDs in localStorage?",
  "choices": [
    "Storing them in query parameters",
    "Using HTTP-only cookies",
    "Using window.name",
    "Encrypting them and storing in localStorage"
  ],
  "correctAnswers": [1],
  "explanation": "HTTP-only cookies cannot be accessed by JavaScript, preventing them from being stolen via XSS attacks. This makes them a more secure choice for storing sensitive information like session tokens compared to localStorage."
},
{
  "question": "Which type of vulnerability is commonly found in XML parsers?",
  "choices": [
    "SQL Injection",
    "Command Injection",
    "XML External Entity (XXE)",
    "Buffer Overflow"
  ],
  "correctAnswers": [2],
  "explanation": "XXE vulnerabilities occur when XML parsers process external entities defined in the XML, allowing attackers to read arbitrary files, perform SSRF (Server-Side Request Forgery), or DoS. Disabling external entity resolution mitigates this risk."
},
{
  "question": "What is an advantage of multi-factor authentication (MFA)?",
  "choices": [
    "It makes login faster",
    "It improves SEO rankings",
    "It increases security by requiring more than one proof of identity",
    "It reduces the number of users"
  ],
  "correctAnswers": [2],
  "explanation": "MFA combines two or more factors: something you know (password), something you have (phone, token), and something you are (biometric). This reduces the likelihood that a single compromised credential leads to a full account breach."
},
{
  "question": "Why is using outdated software a security risk?",
  "choices": [
    "It takes up more memory",
    "It often contains known vulnerabilities",
    "It causes slower page load",
    "It disables JavaScript"
  ],
  "correctAnswers": [1],
  "explanation": "Outdated software may include known security flaws that attackers can easily exploit. Keeping all dependencies and systems updated ensures that security patches are applied and known exploits are closed off."
},
{
  "question": "What is the primary security benefit of a WAF (Web Application Firewall)?",
  "choices": [
    "It blocks spam emails",
    "It protects against DDoS attacks only",
    "It filters and monitors HTTP traffic to prevent attacks like SQLi and XSS",
    "It replaces the need for encryption"
  ],
  "correctAnswers": [2],
  "explanation": "A Web Application Firewall sits between users and your web application, inspecting HTTP traffic. It helps detect and block common attack patterns like SQL injection, XSS, and file inclusion, adding a layer of protection beyond input validation."
},
{
  "question": "Which of these would best protect a password stored in a database?",
  "choices": [
    "Base64 encoding",
    "SHA-1 hashing",
    "Hashing with bcrypt or Argon2 and salting",
    "MD5 hashing only"
  ],
  "correctAnswers": [2],
  "explanation": "bcrypt and Argon2 are purpose-built for secure password hashing. They are slow by design (resisting brute-force), support salting (defending against rainbow tables), and are adaptable. Plain hashes like SHA-1 or MD5 are outdated and insecure."
},
{
  "question": "Why is it important to implement input validation on both client and server sides?",
  "choices": [
    "To improve battery life",
    "To prevent memory leaks",
    "To block malicious inputs and ensure consistency even if JavaScript is bypassed",
    "To save hosting costs"
  ],
  "correctAnswers": [2],
  "explanation": "Client-side validation enhances user experience, but it can be bypassed. Server-side validation is critical for enforcing rules and preventing security issues like SQL injection, XSS, or buffer overflow regardless of client behavior."
},
{
  "question": "What is the purpose of the SameSite cookie attribute?",
  "choices": [
    "To prevent cookies from being stored",
    "To allow cross-site scripting",
    "To control whether cookies are sent with cross-site requests",
    "To enable cookie encryption"
  ],
  "correctAnswers": [2],
  "explanation": "The `SameSite` attribute helps mitigate CSRF by controlling when cookies are sent with cross-origin requests. 'Strict' blocks all cross-site cookies, 'Lax' allows some (e.g., top-level navigation), and 'None' allows all but must be used with `Secure`."
},
{
  "question": "Which technique is used to detect port scanning?",
  "choices": [
    "Firewall rules",
    "DNS spoofing",
    "Intrusion Detection Systems (IDS)",
    "Tokenization"
  ],
  "correctAnswers": [2],
  "explanation": "IDS can detect unusual network patterns, such as numerous connection attempts to different ports in a short period—indicative of a port scan. Tools like Snort or Suricata are often used to spot these behaviors in real-time."
},
{
  "question": "Why are default credentials a major security risk?",
  "choices": [
    "They are difficult to guess",
    "They are not compatible with modern browsers",
    "They are widely known and published online",
    "They automatically trigger firewall rules"
  ],
  "correctAnswers": [2],
  "explanation": "Default credentials like 'admin/admin' are commonly published by vendors and are known to attackers. Many automated bots scan the internet specifically for devices or applications using these to gain easy unauthorized access."
},
{
  "question": "What is directory traversal?",
  "choices": [
    "A type of cross-site scripting attack",
    "Accessing unauthorized directories using special character sequences",
    "Bypassing login pages via SQL",
    "Redirecting users to malicious domains"
  ],
  "correctAnswers": [1],
  "explanation": "Directory traversal exploits improper sanitization of user-supplied file paths. Attackers use patterns like `../` to access files outside the intended directory, potentially reaching sensitive files like `/etc/passwd` or `config.php`."
},
{
  "question": "What does the principle of least privilege state?",
  "choices": [
    "Users should have all possible permissions by default",
    "Users should be denied access to all files",
    "Users should only be given permissions essential for their role",
    "Users should rotate passwords weekly"
  ],
  "correctAnswers": [2],
  "explanation": "The principle of least privilege means users or systems should have only the minimum access rights needed to perform their duties. This reduces the attack surface and limits damage if an account is compromised."
},
{
  "question": "How does a SQL injection attack typically work?",
  "choices": [
    "By exploiting unvalidated input in database queries",
    "By modifying session cookies",
    "By installing a keylogger on the client",
    "By changing the DNS resolution"
  ],
  "correctAnswers": [0],
  "explanation": "SQL injection involves inserting or manipulating SQL code via user inputs that are not properly sanitized. If the query string is directly built using user input, attackers can manipulate it to extract, modify, or delete database data."
},
{
  "question": "What does HSTS (HTTP Strict Transport Security) do?",
  "choices": [
    "Forces browsers to always use HTTPS",
    "Blocks access to all non-secure websites",
    "Encrypts DNS traffic",
    "Prevents man-in-the-middle attacks on Wi-Fi"
  ],
  "correctAnswers": [0],
  "explanation": "HSTS is a security header that tells the browser to only interact with a site over HTTPS, even if the user types 'http://'. It prevents downgrade attacks and cookie hijacking by ensuring encrypted communication from the start."
},
{
  "question": "What is a honeypot in cybersecurity?",
  "choices": [
    "A way to encrypt traffic",
    "A system designed to attract and analyze attackers",
    "An antivirus for mobile devices",
    "A password hashing algorithm"
  ],
  "correctAnswers": [1],
  "explanation": "A honeypot is a decoy system or resource intentionally left vulnerable to lure attackers. It’s used to study attacker behavior, gather intelligence, and detect intrusion attempts without risking production systems."
},
{
  "question": "What is session fixation?",
  "choices": [
    "A vulnerability where an attacker sets a user's session ID in advance",
    "A form of brute-force attack",
    "An XSS variant targeting admin panels",
    "A vulnerability in VPN protocols"
  ],
  "correctAnswers": [0],
  "explanation": "In session fixation, the attacker tricks the victim into using a known session ID (e.g., via a link), then hijacks the session once the victim logs in. Proper regeneration of session IDs after login mitigates this risk."
},
{
  "question": "Which protocol is commonly used to encrypt emails end-to-end?",
  "choices": [
    "HTTPS",
    "TLS",
    "PGP",
    "SSH"
  ],
  "correctAnswers": [2],
  "explanation": "PGP (Pretty Good Privacy) provides encryption, authentication, and integrity for email communication. It uses asymmetric encryption where messages are encrypted with the recipient's public key and decrypted with their private key."
},
{
  "question": "What is the main function of a firewall?",
  "choices": [
    "To monitor CPU usage",
    "To block or allow network traffic based on security rules",
    "To encrypt sensitive files",
    "To manage user passwords"
  ],
  "correctAnswers": [1],
  "explanation": "A firewall is a network security device or software that monitors and filters incoming and outgoing network traffic based on an organization's predefined security policies. It acts as a barrier between a trusted internal network and untrusted external networks (like the internet)."
},
{
  "question": "What is a zero-day vulnerability?",
  "choices": [
    "A vulnerability disclosed after 30 days of discovery",
    "A vulnerability that only affects mobile devices",
    "A previously unknown security flaw with no available patch",
    "A harmless bug that developers ignore"
  ],
  "correctAnswers": [2],
  "explanation": "A zero-day vulnerability is a security flaw that is unknown to those who should be interested in mitigating it. Since no patch exists at the time of discovery or exploitation, attackers can use it before developers address the issue, making it highly dangerous."
},
{
  "question": "Why is input validation critical in web applications?",
  "choices": [
    "To speed up the loading time of pages",
    "To minimize server CPU load",
    "To prevent injection attacks like XSS and SQLi",
    "To format data for easier reading"
  ],
  "correctAnswers": [2],
  "explanation": "Input validation ensures that data provided by users is checked for correctness, length, format, and type. Without it, attackers can inject malicious scripts or SQL commands, leading to vulnerabilities like SQL injection and cross-site scripting."
},
{
  "question": "What does CVE stand for in cybersecurity?",
  "choices": [
    "Certified Vulnerability Exploit",
    "Common Vulnerability Enumeration",
    "Common Vulnerabilities and Exposures",
    "Cybersecurity Verified Entry"
  ],
  "correctAnswers": [2],
  "explanation": "CVE stands for 'Common Vulnerabilities and Exposures'. It's a publicly disclosed list of known cybersecurity vulnerabilities maintained by MITRE. Each CVE has a unique ID, helping organizations track and respond to specific threats."
},
{
  "question": "Which of the following is a type of denial-of-service (DoS) attack?",
  "choices": [
    "Buffer overflow",
    "Brute-force login",
    "SYN flood",
    "ARP poisoning"
  ],
  "correctAnswers": [2],
  "explanation": "A SYN flood is a DoS attack where the attacker sends many TCP connection requests (SYN packets) but doesn't complete the handshake. This consumes server resources and prevents legitimate users from connecting."
},
{
  "question": "How does HTTPS protect user data?",
  "choices": [
    "By hiding the website content from the user",
    "By using encryption to secure the communication between browser and server",
    "By blocking malware downloads",
    "By requiring strong passwords"
  ],
  "correctAnswers": [1],
  "explanation": "HTTPS encrypts the data transferred between a user's browser and the website server using TLS (Transport Layer Security). This prevents eavesdroppers from seeing sensitive information like passwords, credit card numbers, and personal data."
},
{
  "question": "What is a logic bomb?",
  "choices": [
    "A security feature in programming languages",
    "A form of authentication mechanism",
    "A piece of malicious code that triggers under specific conditions",
    "A cryptographic key that expires after use"
  ],
  "correctAnswers": [2],
  "explanation": "A logic bomb is a malicious script embedded in a system that activates when specific conditions are met, such as a particular date or deletion of a user. It can cause damage by deleting files, corrupting data, or disabling systems."
},
{
  "question": "Which header protects against clickjacking?",
  "choices": [
    "X-Frame-Options",
    "Content-Type",
    "Cache-Control",
    "X-XSS-Protection"
  ],
  "correctAnswers": [0],
  "explanation": "The `X-Frame-Options` HTTP header tells the browser whether a page can be displayed within an iframe. By setting it to `DENY` or `SAMEORIGIN`, it prevents malicious websites from embedding your site and tricking users into clicking hidden elements (clickjacking)."
},
{
  "question": "What is the risk of hardcoding API keys in frontend applications?",
  "choices": [
    "It makes the application run slower",
    "It causes code compilation issues",
    "It exposes sensitive credentials to anyone viewing the source code",
    "It prevents CI/CD deployment"
  ],
  "correctAnswers": [2],
  "explanation": "Hardcoding API keys in frontend apps (like JavaScript) exposes them to anyone inspecting the page source. Attackers can misuse these keys, especially if they belong to third-party services with billing or sensitive permissions."
},
{
  "question": "What is ARP spoofing?",
  "choices": [
    "A method of redirecting emails to another inbox",
    "Falsifying MAC addresses to intercept network traffic",
    "Injecting SQL commands into input fields",
    "A way to overload DNS resolvers"
  ],
  "correctAnswers": [1],
  "explanation": "ARP spoofing involves sending fake ARP (Address Resolution Protocol) messages on a local network. This tricks devices into associating the attacker’s MAC address with a legitimate IP address, allowing the attacker to intercept or manipulate traffic (Man-in-the-Middle)."
},
{
  "question": "What is the primary danger of using outdated software in a production environment?",
  "choices": [
    "The software may become too fast for older hardware",
    "The interface may change unexpectedly",
    "It increases the risk of known vulnerabilities being exploited",
    "The software will no longer support multi-threading"
  ],
  "correctAnswers": [2],
  "explanation": "Outdated software often contains security flaws that have already been discovered and published. If these vulnerabilities are not patched, attackers can easily exploit them, especially since they are widely documented and often automated in exploit kits."
},
{
  "question": "What is the purpose of a honeypot in cybersecurity?",
  "choices": [
    "To trap and study attackers by simulating vulnerable systems",
    "To distribute updates to security systems",
    "To encrypt data during transmission",
    "To scan devices for open ports"
  ],
  "correctAnswers": [0],
  "explanation": "A honeypot is a decoy system set up to appear as a legitimate target for attackers. It allows security teams to observe attack techniques, gather intelligence, and distract attackers from real systems. It’s used as both a research and defense mechanism."
},
{
  "question": "What is an XSS (Cross-Site Scripting) attack?",
  "choices": [
    "An attack where SQL code is injected into a database",
    "An attack where malicious scripts are injected into web pages viewed by users",
    "A brute-force attack on authentication systems",
    "An attack on cryptographic keys"
  ],
  "correctAnswers": [1],
  "explanation": "XSS attacks occur when malicious scripts are injected into web pages, which are then executed in the browsers of users who view them. This can lead to session hijacking, redirection, or credential theft. Proper input sanitization and output encoding can prevent XSS."
},
{
  "question": "Which protocol is commonly used to securely transfer files over the Internet?",
  "choices": [
    "FTP",
    "HTTP",
    "SFTP",
    "POP3"
  ],
  "correctAnswers": [2],
  "explanation": "SFTP (SSH File Transfer Protocol) is a secure version of FTP that uses the SSH protocol to encrypt the transfer of files. Unlike regular FTP, SFTP prevents credentials and files from being transmitted in plaintext, offering confidentiality and integrity."
},
{
  "question": "What is the principle of least privilege?",
  "choices": [
    "Allowing users to share administrator rights for faster operations",
    "Giving users the minimum level of access necessary to perform their tasks",
    "Granting all permissions to reduce support requests",
    "Removing all privileges by default for external users"
  ],
  "correctAnswers": [1],
  "explanation": "The principle of least privilege (PoLP) means giving users only the permissions they need to do their job and nothing more. This limits the potential damage if an account is compromised and reduces the attack surface across systems."
},
{
  "question": "What is a dictionary attack?",
  "choices": [
    "An attack using random characters to guess a password",
    "An attack that targets online dictionaries",
    "An attempt to guess passwords using a predefined list of common words",
    "An attack that overloads the DNS server"
  ],
  "correctAnswers": [2],
  "explanation": "A dictionary attack is a type of brute-force attack where the attacker tries many common words or passwords (often from a list or dictionary) to guess the correct password. It’s effective against weak passwords based on common terms."
},
{
  "question": "Which layer of the OSI model does the TLS protocol operate on?",
  "choices": [
    "Application",
    "Transport",
    "Session",
    "Network"
  ],
  "correctAnswers": [1],
  "explanation": "TLS (Transport Layer Security) operates at the transport layer of the OSI model. It provides end-to-end encryption for data in transit between applications over the network, ensuring confidentiality, integrity, and authentication."
},
{
  "question": "What is the role of a vulnerability scanner?",
  "choices": [
    "To remove malware automatically",
    "To patch systems after an attack",
    "To identify security flaws in systems or applications",
    "To encrypt network traffic"
  ],
  "correctAnswers": [2],
  "explanation": "A vulnerability scanner is a tool used to detect known security weaknesses in systems, applications, or networks. It compares system configurations and software versions against databases of known vulnerabilities to generate reports for remediation."
},
{
  "question": "What is multi-factor authentication (MFA)?",
  "choices": [
    "A backup login method using cookies",
    "Using at least two forms of identity verification from different categories",
    "Using a longer password with more symbols",
    "A login method requiring only biometrics"
  ],
  "correctAnswers": [1],
  "explanation": "Multi-factor authentication requires users to provide two or more verification methods: something they know (password), something they have (token or phone), or something they are (biometric). This adds a strong layer of protection beyond simple credentials."
},
{
  "question": "What is a man-in-the-middle (MITM) attack?",
  "choices": [
    "An attacker breaks into a physical data center",
    "An attacker modifies a mobile app",
    "An attacker secretly intercepts and possibly alters communication between two parties",
    "A DNS server fails and redirects traffic"
  ],
  "correctAnswers": [2],
  "explanation": "In a MITM attack, an attacker secretly relays and possibly alters communication between two parties who believe they are communicating directly. This allows the attacker to eavesdrop, steal data, or inject malicious content unnoticed."
},
{
  "question": "Why is HTTPS preferred over HTTP for websites handling sensitive information?",
  "choices": [
    "HTTPS improves loading speed",
    "HTTPS allows better SEO rankings",
    "HTTPS encrypts data, ensuring confidentiality and integrity",
    "HTTPS avoids cookies altogether"
  ],
  "correctAnswers": [2],
  "explanation": "HTTPS uses TLS/SSL to encrypt data between the user's browser and the server. This prevents attackers from intercepting sensitive information like login credentials or personal data, and also ensures that the data is not tampered with during transit."
},
{
  "question": "What is a security patch?",
  "choices": [
    "An antivirus update file",
    "A temporary fix during system maintenance",
    "A software update that fixes known vulnerabilities",
    "A tool to hide security logs"
  ],
  "correctAnswers": [2],
  "explanation": "A security patch is a specific update released by software vendors to fix vulnerabilities identified in their software. Installing patches promptly is critical to protecting systems from known exploits and zero-day threats."
},
{
  "question": "What type of malware locks a user's data and demands payment?",
  "choices": [
    "Spyware",
    "Trojan",
    "Adware",
    "Ransomware"
  ],
  "correctAnswers": [3],
  "explanation": "Ransomware encrypts a victim's files and demands payment (often in cryptocurrency) for a decryption key. It can spread via email attachments, infected websites, or network vulnerabilities. Backups and cautious behavior are key defenses."
},
{
  "question": "What is the main security concern with public Wi-Fi networks?",
  "choices": [
    "Slower connection speed",
    "Increased data usage",
    "High risk of man-in-the-middle attacks",
    "Lack of battery optimization"
  ],
  "correctAnswers": [2],
  "explanation": "Public Wi-Fi is often unencrypted, allowing attackers on the same network to intercept traffic between your device and the internet. This makes it easier for them to steal credentials or inject malicious content via man-in-the-middle attacks."
},
{
  "question": "What is social engineering in the context of cybersecurity?",
  "choices": [
    "Manipulating social media platforms for profit",
    "Using human interaction to trick individuals into giving up confidential information",
    "Engineering code for secure social networks",
    "A way to influence software development communities"
  ],
  "correctAnswers": [1],
  "explanation": "Social engineering is a manipulation technique that exploits human psychology to gain access to sensitive information. Examples include phishing emails, pretexting, baiting, and impersonation. Training and awareness are essential defenses."
},
{
  "question": "Which of the following is a common sign of a phishing email?",
  "choices": [
    "Well-formatted language and proper grammar",
    "The email is from a known contact",
    "Urgent request with a suspicious link or attachment",
    "Encrypted communication channel"
  ],
  "correctAnswers": [2],
  "explanation": "Phishing emails often include urgent language and malicious links or attachments. Even if the sender appears familiar, spoofed addresses and a sense of urgency (e.g., 'verify your account now') are classic phishing tactics. Always verify before clicking."
},
{
  "question": "Which tool is commonly used to scan for open ports on a network?",
  "choices": [
    "Wireshark",
    "Metasploit",
    "Nmap",
    "Burp Suite"
  ],
  "correctAnswers": [2],
  "explanation": "Nmap (Network Mapper) is a popular tool used for network discovery and port scanning. It helps identify which services are running on which ports and can be used for both legitimate auditing and malicious reconnaissance."
},
{
  "question": "What is a firewall's primary role?",
  "choices": [
    "Encrypt data at rest",
    "Block phishing attempts",
    "Filter incoming and outgoing network traffic",
    "Store log files"
  ],
  "correctAnswers": [2],
  "explanation": "A firewall monitors and controls incoming and outgoing traffic based on security rules. It acts as a barrier between trusted and untrusted networks, allowing or blocking data packets based on defined rules to protect against unauthorized access."
},
{
  "question": "What is a brute-force attack?",
  "choices": [
    "A physical attack on a server room",
    "A method of flooding a website with traffic",
    "A trial-and-error method to guess login credentials",
    "An injection of malicious code into a database"
  ],
  "correctAnswers": [2],
  "explanation": "A brute-force attack systematically tries all possible combinations of passwords or encryption keys until the correct one is found. It's time-consuming and often detected unless mitigated by account lockout policies or CAPTCHA challenges."
},
{
  "question": "What does 'zero-day vulnerability' mean?",
  "choices": [
    "A vulnerability that only affects systems on the first day of use",
    "A newly discovered flaw that is already being exploited before a patch is available",
    "A bug in antivirus definitions",
    "An old vulnerability that was never fixed"
  ],
  "correctAnswers": [1],
  "explanation": "A zero-day vulnerability is a flaw in software that is unknown to the vendor and has no fix at the time it's discovered. Attackers can exploit it immediately, making it highly dangerous. It’s called 'zero-day' because the vendor has had zero days to address it."
},
{
  "question": "What is the purpose of two-factor authentication (2FA)?",
  "choices": [
    "To allow password recovery without email",
    "To require a biometric scan for all logins",
    "To add an extra layer of security beyond just a password",
    "To automatically encrypt all messages"
  ],
  "correctAnswers": [2],
  "explanation": "Two-factor authentication (2FA) adds an additional layer of protection by requiring not only a password but also a second factor — usually something the user has (e.g., a code sent to a phone) or something the user is (e.g., biometric data). This makes unauthorized access significantly harder, even if the password is compromised."
},
{
  "question": "What is the most secure way to store user passwords in a database?",
  "choices": [
    "In plain text",
    "Using Base64 encoding",
    "Hashed and salted using a secure algorithm",
    "Encrypted with the admin's password"
  ],
  "correctAnswers": [2],
  "explanation": "Passwords should never be stored in plain text or with weak encoding like Base64. The best practice is to hash the password using a strong algorithm (e.g., bcrypt, Argon2) and add a unique salt to prevent rainbow table attacks. Salting ensures that even identical passwords result in different hashes."
},
{
  "question": "What is the main function of a VPN (Virtual Private Network)?",
  "choices": [
    "To increase internet speed",
    "To prevent malware infections",
    "To create a secure, encrypted tunnel for data transmission",
    "To provide free internet access"
  ],
  "correctAnswers": [2],
  "explanation": "A VPN encrypts the internet connection between a user's device and a remote server, providing privacy and protection on public or untrusted networks. It helps prevent eavesdropping and hides the user's IP address, making online activity more secure and private."
},
{
  "question": "What kind of attack involves intercepting communication between two parties without their knowledge?",
  "choices": [
    "Denial-of-service attack",
    "Phishing attack",
    "Man-in-the-middle attack",
    "Brute-force attack"
  ],
  "correctAnswers": [2],
  "explanation": "A man-in-the-middle (MITM) attack occurs when an attacker secretly intercepts and possibly alters the communication between two parties. This can be used to steal data, inject malware, or impersonate one of the parties. HTTPS and VPNs help defend against such attacks."
},
{
  "question": "Why is input validation important in web applications?",
  "choices": [
    "To reduce server costs",
    "To improve page load time",
    "To prevent injection attacks like SQL injection",
    "To simplify user interfaces"
  ],
  "correctAnswers": [2],
  "explanation": "Input validation ensures that user inputs conform to expected formats and values. It helps prevent injection attacks (such as SQL injection), buffer overflows, and other security flaws that could be exploited by sending malicious input to the server or application logic."
},
{
  "question": "Which of the following is a principle of the CIA triad in cybersecurity?",
  "choices": [
    "Capacity",
    "Integrity",
    "Adaptability",
    "Availability of source code"
  ],
  "correctAnswers": [1],
  "explanation": "The CIA triad refers to three core principles of cybersecurity: Confidentiality (preventing unauthorized access), Integrity (ensuring data accuracy and consistency), and Availability (ensuring systems and data are accessible when needed). These principles guide security policies and strategies."
},
{
  "question": "Which method best prevents cross-site scripting (XSS)?",
  "choices": [
    "Using CAPTCHAs",
    "Disabling cookies",
    "Escaping user input before rendering in HTML",
    "Encrypting database fields"
  ],
  "correctAnswers": [2],
  "explanation": "To prevent XSS, it is crucial to sanitize and escape user input before it is rendered in the browser. This avoids injecting malicious JavaScript into the webpage. Frameworks often provide utilities to do this safely, and Content Security Policies (CSP) offer additional protection."
},
{
  "question": "What is the purpose of a honeypot in cybersecurity?",
  "choices": [
    "To store backup files securely",
    "To block brute-force attacks",
    "To lure attackers and study their methods",
    "To test website performance"
  ],
  "correctAnswers": [2],
  "explanation": "A honeypot is a decoy system designed to attract cyber attackers and log their behavior. It serves no real business function but mimics valuable assets. Security professionals use it to detect, analyze, and understand attack vectors and patterns, helping improve defenses."
},
{
  "question": "Which type of malware disguises itself as legitimate software?",
  "choices": [
    "Worm",
    "Adware",
    "Trojan horse",
    "Rootkit"
  ],
  "correctAnswers": [2],
  "explanation": "A Trojan horse pretends to be legitimate software but delivers malicious payload once installed. Unlike viruses or worms, Trojans don’t self-replicate but are often used to install backdoors, steal data, or provide remote access to attackers."
},
{
  "question": "What is the function of an intrusion detection system (IDS)?",
  "choices": [
    "To block unauthorized users from entering a room",
    "To monitor network traffic for signs of suspicious activity",
    "To encrypt all internet traffic",
    "To manage user permissions"
  ],
  "correctAnswers": [1],
  "explanation": "An IDS monitors network traffic and system activity for signs of malicious behavior or policy violations. It can alert administrators to potential threats, helping detect intrusions early. Some IDS can work passively (alert-only), while others (IPS) actively block threats."
},
{
  "question": "What is social engineering in the context of cybersecurity?",
  "choices": [
    "Manipulating people to disclose confidential information",
    "Using advanced encryption to secure networks",
    "Writing malware scripts for targeted attacks",
    "Building secure systems using user feedback"
  ],
  "correctAnswers": [0],
  "explanation": "Social engineering involves manipulating individuals into divulging sensitive information or performing actions that compromise security. It often relies on psychological tactics such as impersonation, urgency, or trust. Common examples include phishing, baiting, and pretexting."
},
{
  "question": "Which of the following best describes a zero-day vulnerability?",
  "choices": [
    "A flaw that has already been patched",
    "A flaw that is publicly known and documented",
    "A flaw that is unknown to the vendor and exploited by attackers",
    "A virus that activates on the first day of infection"
  ],
  "correctAnswers": [2],
  "explanation": "A zero-day vulnerability is a security flaw that is unknown to the software vendor, meaning no patch or fix is available at the time of discovery. Attackers can exploit these vulnerabilities before developers have a chance to address them, making them highly dangerous."
},
{
  "question": "What does the term 'phishing' refer to?",
  "choices": [
    "Scanning ports for open services",
    "Intercepting encrypted traffic",
    "Sending fraudulent messages to trick recipients into revealing sensitive data",
    "Physically stealing a device"
  ],
  "correctAnswers": [2],
  "explanation": "Phishing is a form of social engineering where attackers impersonate legitimate entities (e.g., banks, services) via email, SMS, or websites to trick victims into providing login credentials, credit card numbers, or other sensitive data. Spear phishing targets specific individuals."
},
{
  "question": "Why is HTTPS more secure than HTTP?",
  "choices": [
    "It loads pages faster",
    "It uses port 443 instead of port 80",
    "It encrypts data transmitted between the client and server",
    "It allows websites to block malware"
  ],
  "correctAnswers": [2],
  "explanation": "HTTPS (Hypertext Transfer Protocol Secure) encrypts data in transit using SSL/TLS, preventing attackers from intercepting or tampering with sensitive information like login credentials or payment details. HTTP, by contrast, sends data in plaintext, exposing it to eavesdropping."
},
{
  "question": "What is the primary goal of penetration testing?",
  "choices": [
    "To monitor server uptime",
    "To audit financial transactions",
    "To find and exploit security weaknesses before attackers do",
    "To configure firewall rules"
  ],
  "correctAnswers": [2],
  "explanation": "Penetration testing (or pentesting) simulates cyberattacks to identify vulnerabilities in systems, applications, or networks. It helps organizations discover and fix weaknesses before malicious hackers can exploit them. Pentesters use a mix of automated tools and manual techniques."
},
{
  "question": "What is a DDoS attack?",
  "choices": [
    "An attack that modifies a website’s content",
    "A malware that steals login credentials",
    "An attack that floods a server with traffic to make it unavailable",
    "A method of scanning for open ports"
  ],
  "correctAnswers": [2],
  "explanation": "A Distributed Denial of Service (DDoS) attack aims to overwhelm a target system, such as a website or server, with massive amounts of traffic from multiple sources, often via a botnet. This renders the service slow or completely unavailable to legitimate users."
},
{
  "question": "Which of the following is NOT a strong password practice?",
  "choices": [
    "Using a unique password for each site",
    "Using a mix of upper and lowercase letters, numbers, and symbols",
    "Using personal information like birthdays",
    "Using a password manager"
  ],
  "correctAnswers": [2],
  "explanation": "Including personal information like birthdays or names makes passwords easier to guess through social engineering or brute force attacks. Strong passwords should be long, random, and unique. A password manager can help users generate and store complex passwords securely."
},
{
  "question": "Why are software updates important for security?",
  "choices": [
    "They improve the graphical interface",
    "They add more user accounts",
    "They often patch known vulnerabilities",
    "They disable antivirus software"
  ],
  "correctAnswers": [2],
  "explanation": "Software updates frequently include patches for security vulnerabilities that have been discovered since the last release. Delaying updates leaves systems exposed to known threats that could be exploited by attackers. Regular updates are critical for maintaining security."
},
{
  "question": "Which of the following is considered a physical security control?",
  "choices": [
    "Firewall configuration",
    "Biometric access to server rooms",
    "Antivirus software",
    "Disk encryption"
  ],
  "correctAnswers": [1],
  "explanation": "Physical security controls protect the physical access to systems and infrastructure. Biometric access, security cameras, locks, and mantraps prevent unauthorized individuals from physically reaching servers or network equipment, which could otherwise compromise systems directly."
},
{
  "question": "What does the term 'least privilege' refer to in access control?",
  "choices": [
    "Allowing users full access to all systems for productivity",
    "Granting users only the permissions necessary to perform their tasks",
    "Disabling all access by default",
    "Giving administrators access to everything without restriction"
  ],
  "correctAnswers": [1],
  "explanation": "The principle of least privilege ensures that users, processes, or systems are granted only the minimum level of access required to perform their function. This reduces the attack surface and limits the damage that can result from accidental or malicious misuse of privileges."
},
{
  "question": "What is the main function of a firewall in a network?",
  "choices": [
    "Encrypting data before transmission",
    "Preventing unauthorized access to or from a private network",
    "Backing up data regularly",
    "Monitoring user activity on social media"
  ],
  "correctAnswers": [1],
  "explanation": "A firewall monitors and controls incoming and outgoing network traffic based on predetermined security rules. Its main purpose is to create a barrier between a trusted internal network and untrusted external networks (like the internet), blocking malicious traffic and unauthorized access."
},
{
  "question": "Which type of malware is designed to demand payment from users to regain access to their systems?",
  "choices": [
    "Spyware",
    "Trojan",
    "Ransomware",
    "Worm"
  ],
  "correctAnswers": [2],
  "explanation": "Ransomware encrypts the victim's data or locks them out of their system and demands a ransom (usually in cryptocurrency) to restore access. It can be spread through phishing emails, malicious downloads, or vulnerabilities in software and operating systems."
},
{
  "question": "What does 'multi-factor authentication' (MFA) require?",
  "choices": [
    "Two users logging in at once",
    "Using multiple passwords for one account",
    "Combining two or more forms of identity verification",
    "Typing a password multiple times"
  ],
  "correctAnswers": [2],
  "explanation": "Multi-factor authentication strengthens security by requiring at least two different types of verification: something you know (password), something you have (authenticator app or hardware token), and something you are (biometric data like fingerprint or facial recognition)."
},
{
  "question": "Which protocol is used to securely transfer files over the internet?",
  "choices": [
    "FTP",
    "HTTP",
    "SMTP",
    "SFTP"
  ],
  "correctAnswers": [3],
  "explanation": "SFTP (SSH File Transfer Protocol) is a secure version of the File Transfer Protocol (FTP) that uses the SSH protocol to encrypt commands and data, protecting files from being intercepted during transmission."
},
{
  "question": "What is the purpose of hashing in cybersecurity?",
  "choices": [
    "To compress files before sending them",
    "To convert readable data into unreadable format for storage or transmission",
    "To identify duplicate files in a system",
    "To verify data integrity"
  ],
  "correctAnswers": [3],
  "explanation": "Hashing converts data into a fixed-length string (a hash) using a hash function. This is primarily used to ensure data integrity—if even a single bit changes in the input, the resulting hash will be completely different. It is commonly used in storing passwords and verifying downloads."
},
{
  "question": "What is the main security risk of using outdated software?",
  "choices": [
    "It may not support cloud features",
    "It may increase the size of backups",
    "It likely contains unpatched vulnerabilities",
    "It uses more memory than new software"
  ],
  "correctAnswers": [2],
  "explanation": "Outdated software may contain known security vulnerabilities that hackers can easily exploit. Since the vendor no longer supports or updates the software, these flaws remain unpatched, putting systems at high risk of compromise."
},
{
  "question": "What does the CIA triad stand for in cybersecurity?",
  "choices": [
    "Central Intelligence Agency",
    "Control, Integrity, Access",
    "Confidentiality, Integrity, Availability",
    "Cybersecurity, Innovation, Automation"
  ],
  "correctAnswers": [2],
  "explanation": "The CIA triad is a foundational model in cybersecurity representing three core principles: Confidentiality (keeping data private), Integrity (ensuring data isn’t altered), and Availability (ensuring authorized users can access data when needed)."
},
{
  "question": "Which of the following is a common method used in man-in-the-middle (MITM) attacks?",
  "choices": [
    "URL spoofing",
    "MAC address filtering",
    "Packet sniffing on unsecured networks",
    "Firewall configuration"
  ],
  "correctAnswers": [2],
  "explanation": "Man-in-the-middle attacks involve intercepting and potentially altering communication between two parties. Packet sniffing, especially on unsecured Wi-Fi networks, is a common technique where the attacker captures data packets to extract sensitive information like login credentials."
},
{
  "question": "What is the primary function of an Intrusion Detection System (IDS)?",
  "choices": [
    "To physically block network attacks",
    "To log user login attempts",
    "To detect unauthorized access or suspicious activity on a network",
    "To provide internet connectivity"
  ],
  "correctAnswers": [2],
  "explanation": "An IDS monitors network or system traffic for malicious activity or policy violations. It alerts administrators when such events are detected but does not typically take direct action to block them (unlike an Intrusion Prevention System, or IPS)."
},
{
  "question": "Why are admin/root accounts considered a security risk if misused?",
  "choices": [
    "They have slow performance",
    "They cannot run antivirus software",
    "They can bypass security restrictions and make system-wide changes",
    "They are not compatible with user profiles"
  ],
  "correctAnswers": [2],
  "explanation": "Admin or root accounts have elevated privileges and can install software, change configurations, and access any data on the system. If compromised, attackers can take full control of the system, which is why minimizing use and protecting these accounts is critical."
},
{
  "question": "Which of the following best describes phishing?",
  "choices": [
    "A technique used to speed up internet browsing",
    "A method of physically stealing a device",
    "A social engineering attack that tricks users into revealing personal information",
    "A type of firewall misconfiguration"
  ],
  "correctAnswers": [2],
  "explanation": "Phishing is a form of social engineering where attackers send fraudulent messages (usually via email) that appear to come from legitimate sources. The goal is to trick victims into revealing sensitive data such as login credentials or financial information."
},
{
  "question": "What is the primary security benefit of HTTPS over HTTP?",
  "choices": [
    "Faster page load times",
    "Data is encrypted during transmission",
    "Better compatibility with old browsers",
    "More SEO-friendly URLs"
  ],
  "correctAnswers": [1],
  "explanation": "HTTPS encrypts data in transit between the user's browser and the web server using TLS (Transport Layer Security). This prevents attackers from intercepting or modifying data, unlike HTTP, which sends data in plaintext."
},
{
  "question": "Which type of attack involves overwhelming a server with traffic to make it unavailable?",
  "choices": [
    "SQL Injection",
    "Brute Force Attack",
    "Denial of Service (DoS)",
    "Pharming"
  ],
  "correctAnswers": [2],
  "explanation": "A Denial of Service (DoS) attack floods a target system with excessive traffic or requests, exhausting its resources and rendering it unavailable to legitimate users. Distributed DoS (DDoS) attacks use multiple sources to amplify the effect."
},
{
  "question": "What is a common sign that your computer might be part of a botnet?",
  "choices": [
    "Frequent blue screen errors",
    "Slow performance with high network activity",
    "Files missing from the desktop",
    "Keyboard backlight flickering"
  ],
  "correctAnswers": [1],
  "explanation": "A botnet is a network of compromised computers controlled by a malicious actor. If your computer is part of one, it may show signs like high outbound network traffic, slow performance, and attempts to contact unknown IP addresses—often without your knowledge."
},
{
  "question": "Which principle states that users should only be granted the minimum permissions necessary?",
  "choices": [
    "Zero Trust",
    "Defense in Depth",
    "Principle of Least Privilege",
    "Privilege Escalation"
  ],
  "correctAnswers": [2],
  "explanation": "The Principle of Least Privilege (PoLP) ensures that users, applications, and systems are given only the permissions necessary to perform their duties. This limits the potential damage from accidental misuse or compromise."
},
{
  "question": "What is a sandbox in cybersecurity?",
  "choices": [
    "A type of firewall",
    "A separate environment for testing untrusted code or software",
    "A virus scanner with limited memory usage",
    "A virtual private network"
  ],
  "correctAnswers": [1],
  "explanation": "A sandbox is an isolated environment used to test or execute suspicious code without risking the main system. It's commonly used in malware analysis, application testing, and secure execution of untrusted programs."
},
{
  "question": "Which of the following is the most secure method for storing passwords?",
  "choices": [
    "Plaintext in a database",
    "Encrypted with symmetric key encryption",
    "Hashed with a strong algorithm and salt",
    "Stored in a spreadsheet on the desktop"
  ],
  "correctAnswers": [2],
  "explanation": "The most secure method to store passwords is to hash them using a strong cryptographic algorithm (e.g., bcrypt, Argon2) and add a salt. This prevents even identical passwords from producing the same hash, making attacks like rainbow tables ineffective."
},
{
  "question": "Which attack tricks a DNS server into directing users to a malicious site?",
  "choices": [
    "ARP spoofing",
    "DNS poisoning",
    "IP spoofing",
    "Phishing"
  ],
  "correctAnswers": [1],
  "explanation": "DNS poisoning (or cache poisoning) manipulates DNS records to redirect legitimate users to malicious sites without their knowledge. It compromises the integrity of DNS lookups and is often used in phishing or malware campaigns."
},
{
  "question": "What is a zero-day vulnerability?",
  "choices": [
    "A bug that causes a system crash after reboot",
    "A security flaw that is publicly known but not yet fixed",
    "A vulnerability disclosed on the same day it is fixed",
    "A flaw discovered by antivirus software immediately"
  ],
  "correctAnswers": [1],
  "explanation": "A zero-day vulnerability is a flaw that is unknown to the software vendor and has no available fix. Attackers can exploit it before developers release a patch, making it especially dangerous during the 'zero-day' window of exposure."
},
{
  "question": "Which of the following is a best practice when creating a secure password?",
  "choices": [
    "Use your name and date of birth",
    "Include dictionary words",
    "Use a mix of letters, numbers, and special characters",
    "Keep it under 6 characters"
  ],
  "correctAnswers": [2],
  "explanation": "Strong passwords should include a combination of uppercase and lowercase letters, numbers, and special characters. They should also avoid common words or patterns to resist brute force and dictionary attacks."
},
{
  "question": "What is the function of a firewall in a network?",
  "choices": [
    "To physically block access to a data center",
    "To encrypt internet traffic",
    "To filter incoming and outgoing network traffic based on rules",
    "To monitor employee productivity"
  ],
  "correctAnswers": [2],
  "explanation": "A firewall is a security device—either hardware or software—that filters network traffic based on predefined rules. Its primary role is to block unauthorized access while permitting legitimate communications, helping to prevent malware, intrusions, and data exfiltration."
},
{
  "question": "What does multi-factor authentication (MFA) typically require?",
  "choices": [
    "Two passwords from different sources",
    "A password and a captcha",
    "Two or more types of verification methods (e.g., password + SMS code)",
    "VPN and firewall access"
  ],
  "correctAnswers": [2],
  "explanation": "Multi-factor authentication (MFA) requires users to present two or more verification factors to gain access. These factors typically fall into categories: something you know (e.g., password), something you have (e.g., phone), or something you are (e.g., fingerprint)."
},
{
  "question": "What is social engineering in cybersecurity?",
  "choices": [
    "The process of designing secure networks",
    "Manipulating people to divulge confidential information",
    "A technique for encrypting data",
    "Engineering of secure hardware chips"
  ],
  "correctAnswers": [1],
  "explanation": "Social engineering is the psychological manipulation of people into performing actions or revealing sensitive information. It relies on exploiting human behavior rather than technical vulnerabilities and is used in phishing, baiting, pretexting, and tailgating attacks."
},
{
  "question": "Which protocol secures email transmissions by encrypting messages between servers?",
  "choices": [
    "HTTP",
    "IMAP",
    "SMTP with STARTTLS",
    "FTP"
  ],
  "correctAnswers": [2],
  "explanation": "SMTP with STARTTLS is a protocol extension that allows an email server to upgrade from an insecure connection to a secure one using TLS. This ensures emails are encrypted during transmission, protecting them from interception and tampering."
},
{
  "question": "What does 'brute force attack' mean in cybersecurity?",
  "choices": [
    "Attacking a server with physical tools",
    "Guessing login credentials by trying all possible combinations",
    "Overloading a system with traffic",
    "Redirecting DNS requests"
  ],
  "correctAnswers": [1],
  "explanation": "A brute force attack involves systematically guessing passwords or encryption keys until the correct one is found. It's time-consuming and resource-intensive, but it can be effective if users use weak or common passwords."
},
{
  "question": "Which of the following best describes 'encryption'?",
  "choices": [
    "Removing malware from a system",
    "Encoding data to make it unreadable without a key",
    "Compressing data for faster transmission",
    "Analyzing data for patterns"
  ],
  "correctAnswers": [1],
  "explanation": "Encryption is the process of converting data into a coded format that can only be read by someone who has the correct decryption key. It protects sensitive information from unauthorized access and is fundamental to secure communication."
},
{
  "question": "Why are outdated software applications considered security risks?",
  "choices": [
    "They consume more system memory",
    "They are harder to uninstall",
    "They may have known vulnerabilities with available exploits",
    "They are incompatible with newer hardware"
  ],
  "correctAnswers": [2],
  "explanation": "Outdated software may contain unpatched vulnerabilities that are already known to attackers. Failing to update such software exposes systems to risks, since exploits for these vulnerabilities may be publicly available and widely used."
},
{
  "question": "What is a man-in-the-middle (MitM) attack?",
  "choices": [
    "An attack where the hacker steals a physical device",
    "An attacker secretly intercepts and possibly alters communication between two parties",
    "A brute-force password attack",
    "An attack that floods a network with traffic"
  ],
  "correctAnswers": [1],
  "explanation": "A man-in-the-middle (MitM) attack occurs when an attacker intercepts and potentially alters the communication between two parties without their knowledge. This can compromise data integrity, confidentiality, and authenticity."
},
{
  "question": "What is the main purpose of using a VPN?",
  "choices": [
    "To get faster internet speeds",
    "To download files anonymously",
    "To create a secure, encrypted connection over a public network",
    "To host a website"
  ],
  "correctAnswers": [2],
  "explanation": "A Virtual Private Network (VPN) encrypts your internet traffic and routes it through a secure server, protecting your data from eavesdropping—especially on unsecured networks like public Wi-Fi. It also helps mask your IP address."
},
{
  "question": "What is the purpose of using hashing in cybersecurity?",
  "choices": [
    "To compress data for faster storage",
    "To encrypt communication between users",
    "To uniquely represent data with a fixed-length value",
    "To open firewall ports"
  ],
  "correctAnswers": [2],
  "explanation": "Hashing converts data into a fixed-length string of characters, which acts as a unique fingerprint. It's commonly used in storing passwords securely and verifying data integrity. Unlike encryption, hashing is one-way and not meant to be reversed."
},
{
  "question": "What is the function of a firewall in a network?",
  "choices": [
    "To physically block access to a data center",
    "To encrypt internet traffic",
    "To filter incoming and outgoing network traffic based on rules",
    "To monitor employee productivity"
  ],
  "correctAnswers": [2],
  "explanation": "A firewall is a security device—either hardware or software—that filters network traffic based on predefined rules. Its primary role is to block unauthorized access while permitting legitimate communications, helping to prevent malware, intrusions, and data exfiltration."
},
{
  "question": "What does multi-factor authentication (MFA) typically require?",
  "choices": [
    "Two passwords from different sources",
    "A password and a captcha",
    "Two or more types of verification methods (e.g., password + SMS code)",
    "VPN and firewall access"
  ],
  "correctAnswers": [2],
  "explanation": "Multi-factor authentication (MFA) requires users to present two or more verification factors to gain access. These factors typically fall into categories: something you know (e.g., password), something you have (e.g., phone), or something you are (e.g., fingerprint)."
},
{
  "question": "What is social engineering in cybersecurity?",
  "choices": [
    "The process of designing secure networks",
    "Manipulating people to divulge confidential information",
    "A technique for encrypting data",
    "Engineering of secure hardware chips"
  ],
  "correctAnswers": [1],
  "explanation": "Social engineering is the psychological manipulation of people into performing actions or revealing sensitive information. It relies on exploiting human behavior rather than technical vulnerabilities and is used in phishing, baiting, pretexting, and tailgating attacks."
},
{
  "question": "Which protocol secures email transmissions by encrypting messages between servers?",
  "choices": [
    "HTTP",
    "IMAP",
    "SMTP with STARTTLS",
    "FTP"
  ],
  "correctAnswers": [2],
  "explanation": "SMTP with STARTTLS is a protocol extension that allows an email server to upgrade from an insecure connection to a secure one using TLS. This ensures emails are encrypted during transmission, protecting them from interception and tampering."
},
{
  "question": "What does 'brute force attack' mean in cybersecurity?",
  "choices": [
    "Attacking a server with physical tools",
    "Guessing login credentials by trying all possible combinations",
    "Overloading a system with traffic",
    "Redirecting DNS requests"
  ],
  "correctAnswers": [1],
  "explanation": "A brute force attack involves systematically guessing passwords or encryption keys until the correct one is found. It's time-consuming and resource-intensive, but it can be effective if users use weak or common passwords."
},
{
  "question": "Which of the following best describes 'encryption'?",
  "choices": [
    "Removing malware from a system",
    "Encoding data to make it unreadable without a key",
    "Compressing data for faster transmission",
    "Analyzing data for patterns"
  ],
  "correctAnswers": [1],
  "explanation": "Encryption is the process of converting data into a coded format that can only be read by someone who has the correct decryption key. It protects sensitive information from unauthorized access and is fundamental to secure communication."
},
{
  "question": "Why are outdated software applications considered security risks?",
  "choices": [
    "They consume more system memory",
    "They are harder to uninstall",
    "They may have known vulnerabilities with available exploits",
    "They are incompatible with newer hardware"
  ],
  "correctAnswers": [2],
  "explanation": "Outdated software may contain unpatched vulnerabilities that are already known to attackers. Failing to update such software exposes systems to risks, since exploits for these vulnerabilities may be publicly available and widely used."
},
{
  "question": "What is a man-in-the-middle (MitM) attack?",
  "choices": [
    "An attack where the hacker steals a physical device",
    "An attacker secretly intercepts and possibly alters communication between two parties",
    "A brute-force password attack",
    "An attack that floods a network with traffic"
  ],
  "correctAnswers": [1],
  "explanation": "A man-in-the-middle (MitM) attack occurs when an attacker intercepts and potentially alters the communication between two parties without their knowledge. This can compromise data integrity, confidentiality, and authenticity."
},
{
  "question": "What is the main purpose of using a VPN?",
  "choices": [
    "To get faster internet speeds",
    "To download files anonymously",
    "To create a secure, encrypted connection over a public network",
    "To host a website"
  ],
  "correctAnswers": [2],
  "explanation": "A Virtual Private Network (VPN) encrypts your internet traffic and routes it through a secure server, protecting your data from eavesdropping—especially on unsecured networks like public Wi-Fi. It also helps mask your IP address."
},
{
  "question": "What is the purpose of using hashing in cybersecurity?",
  "choices": [
    "To compress data for faster storage",
    "To encrypt communication between users",
    "To uniquely represent data with a fixed-length value",
    "To open firewall ports"
  ],
  "correctAnswers": [2],
  "explanation": "Hashing converts data into a fixed-length string of characters, which acts as a unique fingerprint. It's commonly used in storing passwords securely and verifying data integrity. Unlike encryption, hashing is one-way and not meant to be reversed."
},
{
  "question": "Which security mechanism helps ensure that a message has not been altered in transit?",
  "choices": ["Encryption", "Authentication", "Integrity check", "Authorization"],
  "correctAnswers": [2],
  "explanation": "An integrity check ensures that the contents of a message remain unchanged during transmission. This is typically achieved using cryptographic hashes or checksums. If even a single bit is altered, the hash will not match, indicating tampering. While encryption protects confidentiality, integrity checks specifically protect data from being modified."
},
{
  "question": "What is the purpose of a security token in an authentication process?",
  "choices": ["To replace passwords", "To provide additional context", "To store session history", "To verify user identity"],
  "correctAnswers": [3],
  "explanation": "A security token is used in authentication processes to verify a user's identity. Tokens often carry proof that a user has already authenticated successfully, such as in OAuth or JWT. They can be time-limited, digitally signed, and contain user claims. They do not typically replace passwords directly but work alongside them in secure authentication flows."
},
{
  "question": "What is a common characteristic of phishing attacks?",
  "choices": ["Exploiting software vulnerabilities", "Sending fake system updates", "Masquerading as trustworthy entities", "Installing keyloggers directly"],
  "correctAnswers": [2],
  "explanation": "Phishing attacks commonly involve pretending to be a legitimate, trustworthy entity such as a bank, employer, or government agency to deceive users into revealing sensitive information. These attacks use social engineering more than technical exploits and are typically executed via email, SMS, or fake websites that mimic real ones."
},
{
  "question": "Which of the following best describes 'defense in depth'?",
  "choices": ["Using a single powerful firewall", "Applying multiple layers of security controls", "Encrypting all user data", "Running antivirus software on all machines"],
  "correctAnswers": [1],
  "explanation": "Defense in depth is a security strategy that uses multiple layers of controls throughout an IT system to protect against potential threats. This means if one control fails, others still provide protection. For example, firewalls, intrusion detection, endpoint protection, access controls, and user awareness training can all work together to reduce risk."
},
{
  "question": "Why are zero-day vulnerabilities particularly dangerous?",
  "choices": ["They are used only by governments", "They are already patched", "They have no known fix at the time of discovery", "They only affect outdated systems"],
  "correctAnswers": [2],
  "explanation": "Zero-day vulnerabilities are flaws in software that are unknown to the vendor and therefore have no patch available at the time they are discovered or exploited. Attackers can exploit these flaws before any mitigation can be applied, making them especially dangerous. They can affect both new and up-to-date systems."
},
{
  "question": "What is the role of a Security Information and Event Management (SIEM) system?",
  "choices": ["To block malware on endpoints", "To manage user identities", "To analyze and correlate security logs", "To perform vulnerability scans"],
  "correctAnswers": [2],
  "explanation": "A SIEM system collects and analyzes security event data from across an organization’s infrastructure. It helps detect suspicious activity, correlates logs from various sources, and alerts analysts about potential security incidents. It’s a critical tool in security operations centers (SOCs) for incident detection and response."
},
{
  "question": "What is the primary purpose of the Same-Origin Policy in web security?",
  "choices": ["To prevent unauthorized access to a website’s server", "To allow cross-site data exchange", "To restrict how a document or script loaded from one origin can interact with resources from another origin", "To manage user session cookies across different websites"],
  "correctAnswers": [2],
  "explanation": "The Same-Origin Policy (SOP) is a critical security mechanism implemented in web browsers to prevent scripts loaded from one origin from interacting with resources from another origin. This policy helps protect sensitive data by ensuring that a script cannot read data from a different domain, even if the user is authenticated on both. It is fundamental in preventing cross-site scripting (XSS) and cross-site request forgery (CSRF) attacks."
},
{
  "question": "Why is HTTPS considered more secure than HTTP?",
  "choices": ["It uses longer URLs", "It blocks ads", "It encrypts the communication between client and server", "It speeds up the connection"],
  "correctAnswers": [2],
  "explanation": "HTTPS (HyperText Transfer Protocol Secure) encrypts the data exchanged between a client (browser) and a server using TLS (formerly SSL), ensuring confidentiality and integrity. This prevents attackers from eavesdropping on sensitive data such as login credentials, credit card numbers, and personal information. HTTP, on the other hand, transmits data in plain text, which can be intercepted easily."
},
{
  "question": "What is a Zero-Day vulnerability?",
  "choices": ["A vulnerability already patched by the vendor", "A flaw known by the vendor for at least 30 days", "A vulnerability that is exploited before the vendor is aware of it", "A security feature"],
  "correctAnswers": [2],
  "explanation": "A Zero-Day vulnerability refers to a security flaw in software that is unknown to the vendor and for which no patch exists. Since the vendor has had 'zero days' to fix it, attackers may exploit this flaw before the software developer becomes aware of it. Zero-day exploits are highly valuable and dangerous because they are difficult to detect and prevent."
},
{
  "question": "What is the purpose of salting passwords before hashing?",
  "choices": ["To speed up the hashing process", "To ensure password uniqueness and prevent precomputed attacks like rainbow tables", "To compress the password", "To reduce server load"],
  "correctAnswers": [1],
  "explanation": "Salting involves adding a unique, random string to each password before hashing it. This prevents attackers from using precomputed hash tables (like rainbow tables) to reverse-engineer the original passwords. Even if two users have the same password, salting ensures their hashed versions are different, thereby enhancing security."
},
{
  "question": "Which header is used to prevent clickjacking attacks?",
  "choices": ["X-Frame-Options", "Content-Security-Policy", "Strict-Transport-Security", "X-XSS-Protection"],
  "correctAnswers": [0],
  "explanation": "Clickjacking attacks involve embedding a website within a hidden frame to trick users into clicking on something they didn’t intend. The `X-Frame-Options` header prevents this by telling the browser whether a site can be embedded in a frame. Setting it to `DENY` or `SAMEORIGIN` mitigates such attacks effectively."
},
{
  "question": "What is a primary goal of penetration testing?",
  "choices": ["To update antivirus software", "To improve user interface design", "To identify and exploit security vulnerabilities in a controlled environment", "To optimize database queries"],
  "correctAnswers": [2],
  "explanation": "Penetration testing, also known as ethical hacking, simulates real-world attacks to identify and exploit vulnerabilities in systems before malicious actors can do so. This helps organizations proactively improve their security posture by fixing issues before they are exploited."
},
{
  "question": "Which kind of attack exploits a web application’s failure to properly validate input?",
  "choices": ["Brute force attack", "SQL Injection", "Denial-of-Service", "Man-in-the-middle"],
  "correctAnswers": [1],
  "explanation": "SQL Injection attacks exploit insufficient input validation by injecting malicious SQL queries into input fields, allowing attackers to manipulate or retrieve sensitive data from the database. Proper input sanitization and use of prepared statements can prevent these attacks."
},
{
  "question": "What is the main purpose of a firewall?",
  "choices": ["To cool down servers", "To encrypt user passwords", "To filter incoming and outgoing network traffic", "To manage user permissions"],
  "correctAnswers": [2],
  "explanation": "A firewall is a network security device or software that monitors and controls network traffic based on predetermined security rules. It acts as a barrier between a trusted internal network and untrusted external networks, such as the internet, preventing unauthorized access and attacks."
},
{
  "question": "Why is input validation crucial in web development?",
  "choices": ["It speeds up development", "It reduces code size", "It ensures inputs conform to expected formats and prevents injection attacks", "It helps generate logs"],
  "correctAnswers": [2],
  "explanation": "Input validation checks that user-provided data meets expected criteria (e.g., no special characters in usernames). This reduces the risk of injection attacks like SQLi and XSS by ensuring malicious code is not interpreted by the application. It is a core principle of secure coding practices."
},
{
  "question": "What is the difference between authentication and authorization?",
  "choices": ["Authentication is about permissions; authorization is about identity", "They are the same", "Authentication verifies identity, authorization grants access to resources", "Authentication is slower than authorization"],
  "correctAnswers": [2],
  "explanation": "Authentication confirms the identity of a user (e.g., through username and password), while authorization determines what resources the authenticated user is allowed to access. For example, logging in is authentication, while accessing admin-only pages requires authorization."
},
{
  "question": "What is the principle of least privilege?",
  "choices": ["Users should have access to all systems", "Give every user full admin rights", "Users should only have the minimum access necessary to perform their job", "Users must change passwords monthly"],
  "correctAnswers": [2],
  "explanation": "The principle of least privilege (PoLP) is a fundamental security concept that dictates users and systems should only be granted the minimal level of access necessary for their roles. This limits potential damage from compromised accounts or software bugs."
},
{
  "question": "Which of the following is an example of social engineering?",
  "choices": ["Using a VPN to hide traffic", "Phishing emails tricking users into revealing passwords", "Installing antivirus software", "Encrypting a hard drive"],
  "correctAnswers": [1],
  "explanation": "Social engineering is the psychological manipulation of people to perform actions or disclose confidential information. A common example is phishing, where attackers pose as trusted entities to steal credentials or install malware through email or fake websites."
},
{
  "question": "What does MFA stand for and why is it important?",
  "choices": ["Major File Access, to allow remote control", "Multiple Firewall Access, to prevent intrusions", "Multi-Factor Authentication, to enhance identity verification", "Managed Function Access, for cloud resources"],
  "correctAnswers": [2],
  "explanation": "MFA (Multi-Factor Authentication) enhances security by requiring users to provide two or more verification factors to access a resource. This typically combines something the user knows (password), something the user has (token or phone), and something the user is (biometrics). It significantly reduces the risk of unauthorized access, even if a password is compromised."
},
{
  "question": "Why is it dangerous to expose admin panels to the public internet?",
  "choices": ["They consume bandwidth", "They make the site slower", "They are common targets for brute force and exploitation attacks", "They require more DNS records"],
  "correctAnswers": [2],
  "explanation": "Admin panels often contain powerful tools to manage or alter systems. If exposed to the internet without protection, they become attractive targets for brute force attacks, exploits, or reconnaissance by attackers. Limiting access to trusted IPs or VPN, and using MFA, can reduce this risk."
}




]
