export const questions = [
  {
    "question": "Which of the following features are available in Azure Defender for Cloud (formerly Azure Security Center Standard tier) but NOT in the Free tier? (Choose TWO.)",
    "choices": [
      "Security recommendations for misconfigured Azure resources",
      "Just-In-Time (JIT) VM access",
      "Threat detection alerts for Azure resources",
      "Secure Score assessment of your environment"
    ],
    "correctAnswers": [1, 2],
    "mutliple": true,
    "explanation": "The Free tier includes basic recommendations and Secure Score. However, Just-In-Time (JIT) VM access and advanced threat detection (e.g., behavioral analytics, malware detection) are exclusive to the Standard (paid) tier."
  },
  {
    "question": "Which statements are true about enabling Just-In-Time VM Access in Azure Security Center? (Choose THREE.)",
    "choices": [
      "Enabling JIT on a VM creates NSG rules that by default deny inbound traffic on the specified management ports.",
      "Just-In-Time VM access is only available with Azure Defender for Cloud (Standard tier).",
      "A JIT request can be configured for a maximum duration of 24 hours.",
      "When a JIT access request is approved, the VM’s operating system firewall is automatically adjusted to allow the traffic.",
      "Just-In-Time access can be configured for on-premises VMs via Azure Arc in the same manner as Azure VMs."
    ],
    "correctAnswers": [0, 1, 2],
    "mutliple": true,
    "explanation": "JIT access creates restrictive NSG rules and is only available in the Standard tier of Defender for Cloud. Each approved session has a maximum duration of 24 hours. Azure doesn’t automatically adjust the OS firewall; it only manages NSG rules."
  }
,
    {
      "question": "Azure Sentinel’s Fusion feature is used for:",
      "choices": [
        "Automatically investigating and remediating incidents using AI-driven playbooks.",
        "Correlating multiple low-fidelity signals across products into high-confidence composite incidents using machine learning.",
        "Ingesting threat intelligence feeds from external sources into Sentinel.",
        "Performing deep packet inspection on network data in Sentinel."
      ],
      "correctAnswers": [1],
      "mutliple": false,
        "explanation": "Fusion est une fonctionnalité d’Azure Sentinel qui utilise le machine learning pour corréler des événements à faible priorité (low fidelity) et les transformer en alertes de sécurité de haute valeur. Cela permet de détecter des menaces complexes qui ne seraient pas visibles isolément."
    },
    {
      "question": "Which of the following are risk detection types provided by Azure AD Identity Protection? (Choose THREE.)",
      "choices": [
        "Leaked credentials",
        "Sign-in from an anonymous IP address",
        "Impossible travel to atypical locations",
        "Malware detected on a user’s device",
        "Suspicious inbox forwarding rule creation"
      ],
      "correctAnswers": [0, 1, 2],
      "mutliple": true,
     "explanation": "Azure AD Identity Protection analyse le comportement des connexions pour identifier des risques tels que les identifiants divulgués, les connexions anonymes (via Tor/VPN) ou les déplacements impossibles entre deux connexions successives. Ce sont des indicateurs forts d’un compte compromis."
      
    },
    {
      "question": "If you want to automatically block sign-ins when Azure AD Identity Protection detects a user with a high sign-in risk, which policy should you configure?",
      "choices": [
        "An Azure AD Identity Protection sign-in risk policy set to block access for high-risk sign-ins.",
        "An Azure AD Identity Protection user risk policy requiring a password change for high-risk users.",
        "A Conditional Access policy requiring multi-factor authentication for high sign-in risk.",
        "Enabling Azure AD Security Defaults in the tenant."
      ],
      "correctAnswers": [0],
      "mutliple": false,
      "explanation": "Une stratégie de risque de connexion dans Azure AD Identity Protection permet de bloquer automatiquement l’accès pour les connexions évaluées comme à haut risque. C’est la solution recommandée pour bloquer les connexions malveillantes sans intervention humaine."
    },
    {
      "question": "You need to enforce multi-factor authentication for all users when they are signing in from outside the corporate network, but not require MFA when on the internal corporate network. How can you achieve this with Azure AD Conditional Access?",
      "choices": [
        "Create a Conditional Access policy for all users and cloud apps, include all locations except exclude the trusted corporate network location, and set it to require MFA.",
        "Use an Azure AD Identity Protection policy and mark the corporate network as safe so that MFA is skipped for those IPs.",
        "Enable MFA trusted IPs for the corporate network in Azure MFA settings and rely on per-user MFA.",
        "Enable Azure AD Security Defaults and add the corporate network as an exception."
      ],
      "correctAnswers": [0],
      "mutliple": false,
      "explanation": "Les stratégies de Conditional Access peuvent cibler des plages IP. En excluant l’adresse réseau de ton entreprise des emplacements concernés, tu peux forcer l’authentification multifacteur uniquement à l’extérieur de ce périmètre sécurisé."
    },
    {
      "question": "Which of the following are valid Session Controls that can be used in an Azure AD Conditional Access policy? (Choose THREE.)",
      "choices": [
        "Require device to be marked as compliant",
        "Sign-in frequency",
        "Persistent browser session",
        "Use app enforced restrictions",
        "Block legacy authentication"
      ],
      "correctAnswers": [1, 2, 3],
      "mutliple": true,
      "explanation": "Les contrôles de session gèrent le comportement de la session après l’accès : 'sign-in frequency' définit la durée de validité d’un token, 'persistent session' évite de redemander l’identification, et 'app enforced restrictions' limite les actions selon l’application (ex: bloquer le téléchargement via SharePoint)."
    },
    {
      "question": "What is an effective way to block legacy (non-modern) authentication attempts in Azure AD?",
      "choices": [
        "Create a Conditional Access policy that targets all users and blocks access for clients not using modern authentication (legacy authentication clients).",
        "Disable modern authentication protocols in Exchange Online.",
        "Enable Azure AD Security Defaults for the tenant.",
        "Require multi-factor authentication in a Conditional Access policy for all users."
      ],
      "correctAnswers": [0, 2],
      "mutliple": true,
      "explanation": "Les méthodes modernes utilisent OAuth2 et SAML, tandis que l’authentification 'legacy' (POP, IMAP, SMTP) est vulnérable. Seules deux approches sont efficaces : créer une policy de Conditional Access bloquant explicitement ces protocoles ou activer les Security Defaults (qui font la même chose automatiquement)."
    },
    {
      "question": "A user is assigned the Reader role at the subscription level, and also the Contributor role on a specific resource group within that subscription. What effective access will the user have on resources in that resource group?",
      "choices": [
        "Read-only access, since the subscription Reader role overrides the Contributor role.",
        "Full Contributor access (create, edit, delete) to resources in that resource group.",
        "No access, because the roles conflict and cancel out.",
        "Owner access to that resource group."
      ],
      "correctAnswers": [1],
      "mutliple": false,
     "explanation": "Le rôle de Contributor sur un groupe de ressources a priorité localement même si l’utilisateur n’est que Reader au niveau abonnement. L’accès est cumulatif : l’utilisateur a donc des droits en lecture sur tout l’abonnement, mais des droits complets sur le groupe ciblé."
    },
    {
      "question": "Which roles allow a user to assign Azure RBAC roles to other users at a scope? (Choose TWO.)",
      "choices": [
        "Owner",
        "User Access Administrator",
        "Global Administrator (Azure AD)",
        "Security Administrator",
        "Contributor"
      ],
      "correctAnswers": [0, 1],
      "mutliple": true,
      "explanation": "Seuls les rôles Owner et User Access Administrator permettent d’attribuer des rôles RBAC à d’autres utilisateurs. Contributor, même avec des permissions larges, ne peut pas déléguer d’autorisations."

    },
    {
      "question": "You want to ensure that any activation of a highly privileged role (like Subscription Owner or Global Administrator) requires approval from a second person before granting access. How can you achieve this?",
      "choices": [
        "Use Azure AD Privileged Identity Management (PIM) and configure the role to require approval for activation.",
        "Enforce multi-factor authentication for the role using a Conditional Access policy.",
        "Create a custom script that requires two administrators to sign off before adding someone to the role.",
        "Enable Azure AD Identity Protection for privileged accounts."
      ],
      "correctAnswers": [0],
      "mutliple": false,
     "explanation": "Azure Privileged Identity Management (PIM) permet de protéger l’activation de rôles sensibles par approbation. On peut configurer un flux avec approbateur désigné, durée limitée, justification requise, etc., pour éviter les abus ou erreurs d’attribution de rôles critiques."

    },
    {
      "question": "Azure AD Privileged Identity Management (PIM) can manage just-in-time access for which types of roles? (Choose TWO.)",
      "choices": [
        "Azure AD directory roles (e.g., Global Administrator)",
        "Azure resource RBAC roles (e.g., Subscription Owner, Contributor)",
        "Azure DevOps project roles",
        "On-premises Active Directory domain roles"
      ],
      "correctAnswers": [0, 1],
      "mutliple": true,
      "explanation": "Azure PIM permet une gestion en temps réel (just-in-time) des rôles pour l’environnement Azure AD (Global Admin, User Admin, etc.) ainsi que pour les rôles RBAC sur les ressources Azure (Owner, Contributor, etc.). Il ne s’applique pas à Azure DevOps ou à un Active Directory on-premise."

    },
    {
      "question": "Which statements are true regarding System-assigned and User-assigned Managed Identities in Azure? (Choose THREE.)",
      "choices": [
        "A System-assigned managed identity is deleted automatically if its Azure resource (e.g., VM) is deleted.",
        "A User-assigned managed identity is an independent Azure resource that can be associated with multiple services.",
        "One Azure resource can have multiple system-assigned managed identities at the same time.",
        "Managed identities remove the need to store credentials in your application code.",
        "User-assigned managed identities are automatically deleted when the last resource using them is deleted."
      ],
      "correctAnswers": [0, 1, 3],
      "mutliple": true,
        "explanation": "Une identité managée système est liée à la durée de vie de la ressource (ex : VM) : elle est supprimée automatiquement avec elle. Une identité managée utilisateur est une ressource indépendante qui peut être partagée entre plusieurs services. Ces identités permettent d'éviter d'utiliser des secrets dans le code."

    },
    {
      "question": "To allow a virtual machine’s system-assigned managed identity to read secrets from an Azure Key Vault, which of the following steps must be performed? (Choose TWO.)",
      "choices": [
        "Enable the system-assigned managed identity on the virtual machine.",
        "Grant the managed identity access to secrets in the Key Vault (for example, by assigning a Key Vault access policy or RBAC role).",
        "Store the virtual machine’s credentials in the Key Vault access policies.",
        "Add the virtual machine’s IP address to the Key Vault firewall.",
        "Create a service principal in Azure AD representing the VM and add it to the Key Vault ACL."
      ],
      "correctAnswers": [0, 1],
      "mutliple": true,
      "explanation": "Il faut d'abord activer l'identité managée système sur la VM, puis accorder explicitement à cette identité des droits d'accès au coffre (via RBAC ou Access Policy). La VM pourra alors s'authentifier auprès d'Azure Key Vault sans stocker de credentials."

    },
    {
      "question": "To prevent permanent loss of secrets in Azure Key Vault, even if they are deleted, which two features should be enabled? (Choose TWO.)",
      "choices": [
        "Soft delete",
        "Purge protection",
        "Content versioning",
        "Resource locks on the Key Vault",
        "Multi-factor authentication for Key Vault access"
      ],
      "correctAnswers": [0, 1],
      "mutliple": true,
        "explanation": "La fonctionnalité Soft Delete permet de restaurer des secrets supprimés, tandis que Purge Protection empêche leur suppression définitive pendant une période définie. Ensemble, elles assurent une protection contre les pertes accidentelles ou malveillantes."

    },
    {
      "question": "A virtual machine has an NSG on its network interface that allows inbound HTTP (TCP port 80) from any source. The subnet NSG, however, denies inbound TCP port 80 from all sources. What will happen if someone on the internet attempts to access this VM on port 80?",
      "choices": [
        "The traffic will be allowed, because the NIC-level NSG rule permits it.",
        "The traffic will be denied, because the subnet NSG’s deny rule will block it.",
        "The two NSG rules will cancel out, resulting in the traffic being allowed by default.",
        "The rule with the lower numeric priority will take precedence, determining whether the traffic is allowed or denied."
      ],
      "correctAnswers": [1],
      "mutliple": false,
        "explanation": "La fonctionnalité Soft Delete permet de restaurer des secrets supprimés, tandis que Purge Protection empêche leur suppression définitive pendant une période définie. Ensemble, elles assurent une protection contre les pertes accidentelles ou malveillantes."

    },
    {
      "question": "Which of the following statements about Azure Application Security Groups (ASGs) are true? (Choose TWO.)",
      "choices": [
        "ASGs allow you to group VM NICs to simplify network security rule management.",
        "You can use an ASG as the source and/or destination in an NSG security rule instead of specific IP addresses.",
        "An ASG can include VMs from any region or virtual network.",
        "ASGs automatically enforce security rules without the need for Network Security Groups."
      ],
      "correctAnswers": [0, 1],
      "mutliple": true,
        "explanation": "Les Application Security Groups permettent de grouper des interfaces réseau (NIC) de VMs. Ces groupes peuvent être utilisés dans les règles NSG pour simplifier la gestion, au lieu de devoir lister chaque IP. Les ASGs sont liés à une région et un réseau virtuel spécifique."

    },
    {
      "question": "Which capabilities does Azure Firewall provide that Network Security Groups alone do not? (Choose THREE.)",
      "choices": [
        "Network Address Translation (NAT) to allow external users to reach internal servers",
        "Filtering outbound traffic based on fully qualified domain names (FQDNs)",
        "Built-in threat intelligence filtering to alert or block traffic from known malicious IPs",
        "Stateless packet filtering for high performance",
        "Defining access control lists for subnets"
      ],
      "correctAnswers": [0, 1, 2],
      "mutliple": true,
        "explanation": "Azure Firewall va au-delà des NSG : il peut faire du NAT (ex : publier un serveur web interne), filtrer les requêtes sortantes par nom de domaine (FQDN), et utiliser Threat Intelligence pour bloquer des IPs connues comme malveillantes. Les NSG sont plus bas niveau (couche 4)."

    },
    {
      "question": "Which features of Azure DDoS Protection Standard are not available with the basic built-in DDoS protection? (Choose TWO.)",
      "choices": [
        "Detailed DDoS attack analytics and telemetry accessible through Azure Monitor",
        "Automatic mitigation of common network-layer (Layer 3/4) attacks",
        "A guarantee of cost protection to credit any scale-out charges incurred during a documented DDoS attack",
        "Protection from application-layer (Layer 7) attacks such as SQL injection"
      ],
      "correctAnswers": [0, 2],
      "mutliple": true,
        "explanation": "Azure DDoS Protection Standard fournit des rapports détaillés via Azure Monitor et une garantie financière (remboursement des surcoûts liés à une attaque DDoS documentée). La version de base intégrée n'offre pas ces fonctionnalités avancées."

    },
    {
      "question": "You need to ensure that even database administrators cannot read certain sensitive data in plaintext in an Azure SQL Database, while applications can still query that data. Which feature should you use?",
      "choices": [
        "Transparent Data Encryption (TDE)",
        "Always Encrypted",
        "Azure Disk Encryption",
        "Row-Level Security (RLS)"
      ],
      "correctAnswers": [1],
      "mutliple": false,
        "explanation": "La fonctionnalité Always Encrypted chiffre les données côté client, de sorte que même un administrateur de base de données ne puisse pas les lire en clair. L'application peut interagir normalement avec ces colonnes via des drivers compatibles (ODBC, JDBC)."

    },
    {
      "question": "Your organization requires that all data stored in an Azure Storage account be encrypted with a customer-managed key. How can you implement this?",
      "choices": [
        "Enable Storage Service Encryption on the storage account and configure it to use a customer-managed Key Vault key.",
        "Enable Transparent Data Encryption (TDE) on the storage account.",
        "Use Azure Disk Encryption for all disks in that storage account.",
        "Store the data in Azure SQL Database instead of Azure Storage to use BYOK."
      ],
      "correctAnswers": [0],
      "mutliple": false,
        "explanation": "Azure Storage chiffre les données automatiquement, mais pour utiliser une clé gérée par le client (BYOK), il faut activer le chiffrement avec clé personnalisée dans les paramètres du compte, en utilisant une clé stockée dans Azure Key Vault."

    },
    {
      "question": "Which of the following are true regarding Azure Disk Encryption for virtual machines? (Choose TWO.)",
      "choices": [
        "It uses BitLocker for Windows VMs and DM-Crypt for Linux VMs to encrypt the disks.",
        "It requires an Azure Key Vault to hold the encryption keys and secrets.",
        "It is enabled by default for all new Azure VMs.",
        "It can only encrypt data disks, not OS disks."
      ],
      "correctAnswers": [0, 1],
      "mutliple": true,
        "explanation": "Azure Storage chiffre les données automatiquement, mais pour utiliser une clé gérée par le client (BYOK), il faut activer le chiffrement avec clé personnalisée dans les paramètres du compte, en utilisant une clé stockée dans Azure Key Vault."

    },
    {
      "question": "Azure Monitor diagnostic settings can be used to send platform or resource logs to which destinations? (Choose THREE.)",
      "choices": [
        "An Azure Log Analytics workspace",
        "An Azure Storage account",
        "An Azure Event Hub",
        "Azure Security Center",
        "Email addresses of administrators"
      ],
      "correctAnswers": [0, 1, 2],
      "mutliple": true,
        "explanation": "Azure Monitor permet d’exporter les journaux et diagnostics vers trois destinations principales : Log Analytics (analyse approfondie), Event Hub (streaming vers outils tiers), et Storage Account (archivage longue durée)."

    },
    {
      "question": "Which of the following are examples of Azure Monitor Metrics (as opposed to Logs)? (Choose TWO.)",
      "choices": [
        "CPU utilization percentage of a VM",
        "Detailed sign-in audit records for a user",
        "Number of requests per second to a web app",
        "Activity Log events for resource deletion"
      ],
      "correctAnswers": [0, 2],
      "mutliple": true,
  "explanation": "Les métriques dans Azure Monitor sont des mesures numériques en temps réel, comme l'utilisation CPU ou le nombre de requêtes par seconde. En revanche, les logs enregistrent des événements détaillés, comme les connexions ou suppressions de ressources."

    },
    {
      "question": "Which of these is a valid effect you can use in an Azure Policy definition? (Choose THREE.)",
      "choices": [
        "Audit",
        "Deny",
        "Enforce",
        "DeployIfNotExists",
        "Allow"
      ],
      "correctAnswers": [0, 1, 3],
      "mutliple": true,
        "explanation": "Les effets valides dans une définition de politique Azure incluent : Audit (signale un non-respect), Deny (bloque la création), et DeployIfNotExists (crée automatiquement une ressource conforme si elle n'existe pas). 'Enforce' et 'Allow' ne sont pas des effets valides."

    },
    {
      "question": "You need to ensure any new resource created in a particular resource group automatically gets a specific tag (Environment: Production) if the tag is missing. What is the best way to accomplish this?",
      "choices": [
        "Create an Azure Policy with a Modify effect that adds the required tag during resource creation.",
        "Create an Azure Policy with a Deny effect to block resources without that tag.",
        "Use an Azure Function triggered by Activity Logs to add the tag to newly created resources.",
        "Apply an Azure Blueprint that assigns the tag to all resources in that resource group."
      ],
      "correctAnswers": [0],
      "mutliple": false,
        "explanation": "L'effet Modify d’Azure Policy permet de modifier la ressource au moment de sa création, par exemple en injectant automatiquement un tag manquant. C’est la solution recommandée pour appliquer des tags de conformité sans bloquer la création."

    },
    {
      "question": "Which items can be included as artifacts in an Azure Blueprint definition? (Choose THREE.)",
      "choices": [
        "Azure Policy assignments",
        "ARM template deployments (Resource Manager templates)",
        "Role assignments",
        "Azure AD Conditional Access policies",
        "Azure Resource Manager locks"
      ],
      "correctAnswers": [0, 1, 2],
      "mutliple": true,
        "explanation": "Un Blueprint Azure peut contenir des assignations de politiques, des rôles RBAC, et des déploiements ARM pour automatiser l’environnement d’un abonnement. Les stratégies Conditional Access ne sont pas incluses dans les Blueprints."

    },
    {
      "question": "An application needs to authenticate users and receive their basic profile information in a token. Which protocol should be used with Azure AD for this purpose?",
      "choices": [
        "OAuth 2.0 (Implicit Grant)",
        "OpenID Connect",
        "SAML 2.0",
        "OAuth 2.0 Client Credentials"
      ],
      "correctAnswers": [1],
      "mutliple": false,
        "explanation": "OpenID Connect est une couche d’identité construite sur OAuth 2.0, utilisée pour authentifier un utilisateur et obtenir des informations de profil (claims). C’est le protocole standard pour les applications qui ont besoin d’authentifier des utilisateurs avec Azure AD."

    },
    {
      "question": "Which statements are true about the OAuth 2.0 Client Credentials flow in Azure AD? (Choose TWO.)",
      "choices": [
        "It’s used by services or daemons that need to access an API without a user context.",
        "It requires a user to sign in and grant consent at runtime.",
        "The application authenticates to Azure AD using its client ID and secret or certificate to obtain a token.",
        "It provides an ID token representing the user for authentication.",
        "Access tokens obtained through this flow carry the permissions granted to the application, not a specific user."
      ],
      "correctAnswers": [0, 2],
      "mutliple": true,
        "explanation": "Le flux client credentials OAuth 2.0 est utilisé pour des applications ou services qui agissent sans contexte utilisateur. L’application s’authentifie directement via son ID client + secret/certificat, et les permissions concernent uniquement l’app elle-même."

    },
    {
      "question": "You are building a single-page application (SPA) that will call a back-end API on behalf of the signed-in user. Which OAuth2 flow is recommended in this scenario to obtain the access token?",
      "choices": [
        "Authorization Code flow with PKCE",
        "Implicit flow",
        "Client Credentials flow",
        "Resource Owner Password Credentials flow"
      ],
      "correctAnswers": [0],
      "mutliple": false,
        "explanation": "Le flow Authorization Code avec PKCE est la méthode recommandée pour les Single Page Applications (SPA), car elle est plus sécurisée et ne nécessite pas de client secret. PKCE protège contre les attaques par interception de code d’autorisation."

    },
    {
      "question": "Which of the following are true regarding JSON Web Tokens (JWTs) issued by Azure AD? (Choose THREE.)",
      "choices": [
        "A JWT consists of three parts (header, payload, signature) encoded in Base64 and separated by periods.",
        "Azure AD’s JWT tokens are typically signed with Azure AD’s private key, and can be validated using the corresponding public key.",
        "Azure AD JWT tokens are encrypted end-to-end so that clients cannot read the token’s contents.",
        "JWTs issued by Azure AD include claims such as 'iss' (issuer), 'aud' (audience), and 'exp' (expiration time)."
      ],
      "correctAnswers": [0, 1, 3],
      "mutliple": true,
        "explanation": "Un JWT est composé de trois parties encodées en Base64 : un en-tête, une charge utile (payload), et une signature. Les tokens Azure AD contiennent des claims standards comme 'iss' (émetteur), 'aud' (audience), 'exp' (expiration), et sont signés mais pas chiffrés."

    },
    {
      "question": "You want to enable threat detection for Azure SQL Database to detect anomalies like SQL injection attacks or unusual data access. Which Azure Defender for Cloud plan should you enable?",
      "choices": [
        "Azure Defender for SQL",
        "Azure Defender for App Service",
        "Azure Defender for Storage",
        "Azure Defender for Key Vault"
      ],
      "correctAnswers": [0],
      "mutliple": false,
        "explanation": "Pour activer la détection des menaces dans Azure SQL, il faut souscrire à Azure Defender for SQL. Ce plan ajoute des capacités comme la détection d'injection SQL, d'accès suspect, ou de requêtes inhabituelles sur les bases de données."

    },
    {
      "question": "What is the simplest way to automatically scan container images for vulnerabilities when they are pushed to an Azure Container Registry?",
      "choices": [
        "Enable Azure Defender for Container Registries on the registry.",
        "Deploy a custom container scanning tool on an Azure VM and point it to the registry.",
        "Use Azure Container Instances to run a vulnerability scanner for each image push.",
        "Write an Azure Function that triggers on image push and runs a scan."
      ],
      "correctAnswers": [0],
      "mutliple": false,
        "explanation": "Activer Azure Defender for Container Registries permet de scanner automatiquement les images Docker poussées dans un Azure Container Registry. Cela fournit une solution intégrée, sans déploiement manuel de scanner ou script personnalisé."

    },
    {
      "question": "Which of the following can be used to restrict network access to an Azure Key Vault so that only a particular virtual network (or subnet) can access it? (Choose TWO.)",
      "choices": [
        "Enable the Key Vault firewall and add a virtual network rule for the specified network.",
        "Create a Private Endpoint for the Key Vault within the target virtual network.",
        "Associate a Network Security Group (NSG) to the Key Vault resource.",
        "Configure a service endpoint for Key Vault on the virtual network and set the Key Vault to allow that virtual network."
      ],
      "correctAnswers": [0, 1],
      "mutliple": true,
        "explanation": "On peut restreindre l'accès réseau à un Azure Key Vault soit via son pare-feu (avec règles réseau), soit via un Private Endpoint. Ces deux méthodes garantissent que seuls des réseaux spécifiques ou sous-réseaux autorisés peuvent l’atteindre."

    },
    {
      "question": "Which of these Azure services cannot have a managed identity (system-assigned or user-assigned) directly associated with it? (Choose TWO.)",
      "choices": [
        "Azure Virtual Machines",
        "Azure Key Vault",
        "Azure App Service (Web Apps)",
        "Azure Storage Account",
        "Azure Functions"
      ],
      "correctAnswers": [1, 3],
      "mutliple": true,
        "explanation": "Azure Key Vault n’est pas une ressource qui peut recevoir une identité managée. De même, les comptes de stockage Azure ne peuvent pas avoir d'identité managée directe. En revanche, les VMs, Azure App Services et Functions le peuvent."

    },
    {
      "question": "You need to encrypt the disks of your Azure virtual machines using your own keys, but without running any encryption agent inside the VMs. Which Azure feature should you use?",
      "choices": [
        "Azure Disk Encryption",
        "Azure Disk Encryption Set (customer-managed keys for Azure Managed Disks)",
        "Azure Storage Service Encryption",
        "Azure Key Vault Managed HSM"
      ],
      "correctAnswers": [1],
      "mutliple": false,
        "explanation": "L’option Disk Encryption Set permet de chiffrer les disques Azure avec des clés gérées par le client (CMK) sans installer d’agent dans la VM. C’est la méthode moderne recommandée pour BYOK (Bring Your Own Key)."

    },
    {
      "question": "If a user is subject to two Azure AD Conditional Access policies – one requiring multi-factor authentication and another requiring a compliant device – what must the user do to successfully sign in to the target application?",
      "choices": [
        "They must satisfy all requirements of both policies (e.g., complete MFA and use a compliant device).",
        "They can choose either to perform MFA or use a compliant device, since satisfying one policy will grant access.",
        "The policy with higher priority will override the other, so only one of the requirements will apply.",
        "The policies will conflict, resulting in the sign-in being blocked."
      ],
      "correctAnswers": [0],
      "mutliple": false,
        "explanation": "Quand un utilisateur est ciblé par plusieurs politiques Conditional Access, il doit satisfaire toutes les conditions (MFA, appareil conforme, etc.) pour accéder à l’application. Ces politiques sont cumulatives, non alternatives."

    }
  ]
  