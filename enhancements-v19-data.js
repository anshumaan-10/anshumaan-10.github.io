window.__V19_DATA = {
	recruiterViews: [
		{
			id: 'executive',
			label: 'Executive View',
			eyebrow: '60-second summary',
			headline: 'Security systems that reduce delivery risk without creating engineering drag.',
			summary: 'This view is for directors, heads of engineering, and recruiters who want the short answer: what problems are being solved, how fast teams get help, and why the outcomes are believable.',
			bullets: [
				'Built platform security controls across 350+ microservices rather than relying on one-off ticket review.',
				'Reduced remediation friction by translating findings into developer-ready actions instead of generic audit language.',
				'Improved release confidence with evidence-linked delivery: scan results, digest identity, approvals, and runtime guardrails.',
				'Delivered 0 production security incidents after the control plane rollout while maintaining shipping velocity.',
				'Works effectively with SDEs, QA, platform operations, engineering managers, and leadership on the same delivery path.'
			],
			highlightLabel: 'What leaders usually care about',
			highlights: [
				'Predictable delivery under policy',
				'Lower operational friction for engineering teams',
				'Clear evidence for audits and incident response',
				'Practical prioritization over noisy security work',
				'High leverage across teams rather than isolated wins'
			],
			closing: 'If the team needs someone who can improve control, throughput, and engineering trust at the same time, this is the operating lane.'
		},
		{
			id: 'technical',
			label: 'Technical View',
			eyebrow: 'Architecture lens',
			headline: 'Delivery path controls from code governance through runtime, with signed evidence at every critical step.',
			summary: 'This view is for staff engineers, security engineers, and platform teams who want technical depth instead of marketing. It focuses on system boundaries, enforcement points, and operating assumptions.',
			bullets: [
				'GitHub governance with PR-only merges, CODEOWNERS, branch protections, and secret scanning as the first policy boundary.',
				'Build-time SAST, SCA, IaC scanning, and image analysis with risk triage based on CVSS, EPSS, and reachability.',
				'SBOM generation, Cosign signing, Sigstore identity verification, and digest-bound promotion to avoid drift.',
				'Kyverno and Kubernetes runtime guardrails enforcing non-root execution, registry allowlists, and admission verification.',
				'Falco, DAST, telemetry, and incident playbooks used as operational feedback loops rather than passive monitoring.'
			],
			highlightLabel: 'What engineers usually care about',
			highlights: [
				'No bypass paths in the promoted delivery lane',
				'Immutable promotion instead of environment rebuild drift',
				'Evidence attached to artifacts rather than stored only in dashboards',
				'Policy-as-code aligned to developer ergonomics',
				'Operational controls that scale across many services'
			],
			closing: 'The main theme is straightforward: secure delivery should be enforced by architecture, not dependent on people remembering the right checklist.'
		},
		{
			id: 'hiring',
			label: 'Hiring Manager View',
			eyebrow: 'Interview lens',
			headline: 'A portfolio designed to answer the usual hiring questions before the interview even starts.',
			summary: 'This view is for hiring managers who need clarity on ownership, seniority, and first-90-day impact. It distills the story into scope, execution style, and role fit.',
			bullets: [
				'Owns cross-functional security work that touches developers, platform teams, QA, and leadership rather than operating in a narrow silo.',
				'Turns vague security concerns into implementation-ready plans with concrete triage logic and measurable outputs.',
				'Communicates clearly to both technical and non-technical stakeholders, reducing delay caused by ambiguity.',
				'Has evidence of production responsibility, not just lab work or certification-only positioning.',
				'Likely to improve release confidence, issue resolution speed, and platform trust in the first few months.'
			],
			highlightLabel: 'What hiring managers usually ask',
			highlights: [
				'Can this person work across teams?',
				'Can they balance standards with delivery pressure?',
				'Will engineers trust the controls they introduce?',
				'Do they bring measurable outcomes rather than abstract guidance?',
				'Can they explain tradeoffs clearly in design and incident settings?'
			],
			closing: 'The strongest fit is any team that wants hands-on security engineering with strong platform empathy and clear execution discipline.'
		},
		{
			id: 'platform',
			label: 'Platform View',
			eyebrow: 'Operator lens',
			headline: 'Security work implemented as paved-road platform behavior, not as a separate lane that teams must negotiate every sprint.',
			summary: 'This view is for platform operators and infra leads. It focuses on rollout practicality, ownership boundaries, and how to introduce controls without making shared systems painful to operate.',
			bullets: [
				'Builds controls that can be adopted through reusable workflows, templates, policy sets, and clear operational defaults.',
				'Treats runtime, cluster, and CI/CD issues as shared-system problems that need careful blast-radius management.',
				'Pairs security enforcement with service-team support so platform teams do not become the universal escalation sink.',
				'Uses immutable promotion, signed artifacts, and policy verification to keep platform state understandable.',
				'Optimizes for observability, deterministic behavior, and reduced toil across platform and application teams.'
			],
			highlightLabel: 'What platform teams usually value',
			highlights: [
				'Clear ownership boundaries',
				'Low-friction rollout mechanics',
				'Strong runtime and admission hygiene',
				'Good telemetry and lower investigation time',
				'Controls that are supportable by operators at scale'
			],
			closing: 'In platform-heavy environments, the value is not just finding risk — it is making secure operation easier to sustain day after day.'
		}
	],
	recruiterScorecards: [
		{
			id: 'security-engineer',
			role: 'Security Engineer',
			score: '96',
			focus: 'Platform controls, measurable risk reduction, engineering partnership.',
			strengths: [
				'Designs preventive controls rather than only reporting findings.',
				'Comfortable operating across delivery, runtime, and governance boundaries.',
				'Uses evidence and telemetry to validate control effectiveness.',
				'Can collaborate with leadership while staying implementation-close.'
			],
			signals: ['Policy-as-code', 'signed evidence', 'incident discipline', 'cross-team delivery']
		},
		{
			id: 'devsecops',
			role: 'DevSecOps Engineer',
			score: '98',
			focus: 'CI/CD security lanes, supply chain integrity, developer-friendly enforcement.',
			strengths: [
				'Builds reusable workflow templates and gating logic that scale.',
				'Balances triage quality with release pressure.',
				'Understands artifact trust, promotion drift, and policy enforcement in depth.',
				'Improves developer experience while increasing control.'
			],
			signals: ['SAST', 'SCA', 'SBOM', 'Cosign', 'Kyverno', 'runtime telemetry']
		},
		{
			id: 'platform-security',
			role: 'Platform Security Engineer',
			score: '95',
			focus: 'Shared-system security, runtime guardrails, and operator-friendly enforcement.',
			strengths: [
				'Strong overlap with Kubernetes, CI/CD, shared infrastructure, and policy rollout.',
				'Treats operational blast radius as a first-class design concern.',
				'Works well with platform teams to introduce controls incrementally and safely.',
				'Understands that supportability matters as much as correctness.'
			],
			signals: ['cluster policy', 'network boundaries', 'digest promotion', 'observability']
		},
		{
			id: 'appsec',
			role: 'Application Security Engineer',
			score: '90',
			focus: 'Secure SDLC, vulnerability triage, DAST/SAST, and developer enablement.',
			strengths: [
				'Brings AppSec into delivery paths instead of leaving it as a late review step.',
				'Produces actionable guidance that developers can use quickly.',
				'Can mix manual analysis with automation and policy rollout.',
				'Comfortable framing issues in both exploitability and engineering terms.'
			],
			signals: ['OWASP', 'ASVS', 'DAST', 'SAST', 'manual testing', 'remediation support']
		},
		{
			id: 'cloud-security',
			role: 'Cloud Security Engineer',
			score: '92',
			focus: 'Identity, governance, segmentation, and secure cloud delivery patterns.',
			strengths: [
				'Strong GCP background with practical governance and access-control thinking.',
				'Comfortable with org controls, workload identity, and perimeter design.',
				'Connects cloud controls to delivery and runtime rather than treating them separately.',
				'Can communicate cloud risk in practical operational terms.'
			],
			signals: ['IAM', 'VPC-SC', 'OIDC', 'org policies', 'cloud posture', 'audit evidence']
		},
		{
			id: 'product-security',
			role: 'Product Security Engineer',
			score: '88',
			focus: 'Design review, threat modeling, secure delivery standards, and risk alignment.',
			strengths: [
				'Can reason from product risk back to system design and enforcement needs.',
				'Comfortable running tradeoff discussions with engineering leads.',
				'Approaches security as an engineering constraint to be designed around, not feared.',
				'Pairs threat thinking with concrete mitigation paths.'
			],
			signals: ['design review', 'threat modeling', 'secure defaults', 'risk framing']
		}
	],
	hireSignals: [
		{
			title: 'Improves release confidence',
			body: 'Controls are introduced in ways that make teams more certain about what is shipping and why, rather than more uncertain about whether the build will survive the day.'
		},
		{
			title: 'Makes fixes easier to execute',
			body: 'Security findings are translated into implementation-ready actions with clear priority, lower ambiguity, and less thrash between teams.'
		},
		{
			title: 'Protects velocity through structure',
			body: 'The secure path is engineered into the default workflow, which is far more scalable than relying on individual heroics or late approvals.'
		},
		{
			title: 'Communicates across levels',
			body: 'Can switch between developer detail, platform constraints, and leadership-level impact without losing clarity or technical accuracy.'
		}
	],
	interviewPrompts: [
		'How were security gates introduced across many services without causing blanket release slowdowns?',
		'What triage logic is used when severity does not match real exploitability?',
		'How are unsigned images and promotion drift prevented in practice?',
		'What changed in developer behavior after reusable controls and remediation guidance were rolled out?',
		'How would the first 90 days differ for a startup platform team versus a mature enterprise security function?',
		'What evidence should exist for any production promotion if the team wants strong incident and audit readiness?'
	],
	proofMetrics: [
		{ label: 'Control surfaces covered', value: 'Code → CI → Registry → Admission → Runtime', note: 'Multiple enforcement boundaries rather than one scanner result.' },
		{ label: 'Decision style', value: 'Risk-prioritized', note: 'Severity plus exploitability and runtime relevance.' },
		{ label: 'Support model', value: 'Engineer-friendly', note: 'Fastest safe fix is part of the workflow, not an afterthought.' },
		{ label: 'Operating signature', value: 'Low-friction enforcement', note: 'Secure defaults with reduced platform toil.' },
		{ label: 'Trust model', value: 'Evidence-linked delivery', note: 'Every artifact and promotion carries explainable proof.' },
		{ label: 'Leadership value', value: 'Predictable throughput', note: 'Risk reduction that improves shipping confidence.' }
	],
	proofArtifacts: [
		{
			id: 'artifact-pr-governance',
			category: 'delivery',
			title: 'PR governance as the first security boundary',
			problem: 'Main-branch controls are weak if teams can bypass review, merge without clear ownership, or accidentally push risky code under release pressure.',
			implementation: 'Introduced PR-only merge pathways, CODEOWNERS ownership, required status checks, and branch protections so governance begins before build and deployment tooling even run.',
			proof: 'Governance becomes visible in every promotion chain because reviewed code, named owners, and required checks are part of the delivery record.',
			outcome: 'Teams gain a predictable code-entry boundary while platform and security teams inherit fewer late surprises downstream.',
			tags: ['CODEOWNERS', 'branch protection', 'review integrity', 'delivery hygiene']
		},
		{
			id: 'artifact-secret-scan',
			category: 'delivery',
			title: 'Push-time secret scanning with organization-specific patterns',
			problem: 'Default detectors catch common keys, but enterprise environments often have internal token shapes, vendor-specific patterns, and custom credentials that escape generic rules.',
			implementation: 'Extended detection logic with custom patterns for internal and cloud-facing secrets, paired with push protection and response actions that shorten the fix loop for developers.',
			proof: 'Findings are caught before they settle into history, and response actions are attached early enough that platform teams are not cleaning up avoidable residue later.',
			outcome: 'Lower credential leakage risk, fewer emergency rotations, and better trust in the source-control layer of the platform.',
			tags: ['push protection', 'custom regex', 'secret hygiene', 'faster remediation']
		},
		{
			id: 'artifact-triage-model',
			category: 'appsec',
			title: 'Risk-prioritized vulnerability triage model',
			problem: 'Severity-only workflows create noise, slow engineering teams, and make it harder to see what is actually worth blocking or escalating.',
			implementation: 'Used a practical three-signal model: CVSS for severity, EPSS for exploitation likelihood, and reachability for runtime relevance. This creates better block/allow decisions.',
			proof: 'The same vulnerability can be explained in both technical and operational terms, making it easier for teams to accept the priority rather than debate it for days.',
			outcome: 'Higher remediation quality, fewer false-positive escalations, and faster engineering action on issues that matter.',
			tags: ['CVSS', 'EPSS', 'reachability', 'prioritization']
		},
		{
			id: 'artifact-dual-scan',
			category: 'appsec',
			title: 'Cross-validated image scanning',
			problem: 'Single-tool trust creates awkward situations where engineering teams question accuracy and security teams spend time defending tool output rather than solving the issue.',
			implementation: 'Paired multiple scanners and aligned blocking policy around validated risk signals so teams had better confidence in what was being reported.',
			proof: 'Disagreements became data points instead of stalemates, and scan findings were easier to discuss with service owners because the process was visibly more deliberate.',
			outcome: 'Lower scanner fatigue, better trust in control outcomes, and clearer escalation logic when high-severity items appear.',
			tags: ['Trivy', 'Prisma', 'confidence', 'less noise']
		},
		{
			id: 'artifact-sbom',
			category: 'supply-chain',
			title: 'SBOM generation attached to the artifact lifecycle',
			problem: 'Dependency visibility becomes weak when inventory exists outside the delivery path or is generated in an inconsistent, ad hoc way.',
			implementation: 'Generated SBOMs for container images and attached them as part of the artifact story so downstream consumers could reason about contents without starting from scratch.',
			proof: 'The artifact carries more of its own evidence, which helps incident response, audit readiness, and promotion confidence.',
			outcome: 'Better dependency visibility, stronger supply-chain traceability, and improved readiness for future policy automation.',
			tags: ['Syft', 'CycloneDX', 'artifact inventory', 'provenance']
		},
		{
			id: 'artifact-signing',
			category: 'supply-chain',
			title: 'Keyless image signing and verification',
			problem: 'Unsigned images and long-lived signing keys create ambiguity and operational risk in production promotion workflows.',
			implementation: 'Moved to identity-bound signing with verification at later stages of the delivery path, reducing trust in mutable conventions and increasing trust in cryptographic assertions.',
			proof: 'The promotion story becomes easier to explain: who built it, what was signed, and what identity was used are all clearer than trust-me workflows.',
			outcome: 'Reduced artifact ambiguity and stronger control over what qualifies as a legitimate deployable image.',
			tags: ['Cosign', 'Sigstore', 'identity', 'promotion trust']
		},
		{
			id: 'artifact-digest-promotion',
			category: 'supply-chain',
			title: 'Immutable digest-based promotion',
			problem: 'Rebuilds across environments introduce drift. Teams think they are promoting a tested artifact when in reality they are rebuilding a close cousin.',
			implementation: 'Bound promotions to immutable digests so the exact image that passed controls could be the one moving across environments without silent mutation.',
			proof: 'Promotion and runtime records line up more cleanly because the identity of the artifact does not change midstream.',
			outcome: 'Higher delivery determinism and simpler investigation paths when teams need to answer what actually ran.',
			tags: ['digest pinning', 'immutability', 'promotion', 'drift control']
		},
		{
			id: 'artifact-kyverno',
			category: 'kubernetes',
			title: 'Admission control enforcing runtime expectations',
			problem: 'Cluster policy is not meaningful if risky workloads can still get admitted under pressure or via informal exceptions.',
			implementation: 'Used policy enforcement for image trust, registry boundaries, security contexts, and baseline runtime expectations so the cluster remained a strong gate rather than a suggestion box.',
			proof: 'Teams experience policy as an explicit runtime rule set instead of a document hidden in a wiki or architecture deck.',
			outcome: 'Better workload hygiene, fewer dangerous deployment patterns, and less operator guesswork about what should be allowed.',
			tags: ['Kyverno', 'admission', 'runtime guardrails', 'cluster hygiene']
		},
		{
			id: 'artifact-cis',
			category: 'kubernetes',
			title: 'Cluster hardening with benchmark-driven controls',
			problem: 'Runtime policy is weaker if the underlying cluster posture is inconsistent or full of exceptions.',
			implementation: 'Used benchmark-driven hardening as a practical baseline for cluster posture, backed by recurring verification and drift awareness.',
			proof: 'Hardening is discussed as an operational standard rather than an occasional project, which improves long-term trust in the environment.',
			outcome: 'Higher confidence in the cluster foundation supporting application and platform controls.',
			tags: ['CIS benchmark', 'cluster posture', 'hardening', 'drift management']
		},
		{
			id: 'artifact-falco',
			category: 'kubernetes',
			title: 'Runtime detection tied to response behavior',
			problem: 'Runtime alerts become background noise when they are not mapped to specific actions, owners, and escalation paths.',
			implementation: 'Connected runtime detections to response expectations and playbooks so alerts had a purpose beyond being forwarded into chat.',
			proof: 'The operating team can answer what happens next instead of just admiring that a detection exists.',
			outcome: 'Better signal handling, faster investigations, and stronger confidence in runtime visibility.',
			tags: ['Falco', 'runtime detection', 'playbooks', 'signal quality']
		},
		{
			id: 'artifact-gcp-governance',
			category: 'cloud',
			title: 'Cloud governance aligned to real workload behavior',
			problem: 'Cloud governance becomes brittle when identity, perimeter, and organization policy are managed independently from delivery and runtime controls.',
			implementation: 'Connected GCP governance patterns with secure delivery thinking so workload identity, org-level boundaries, and service posture were aligned rather than fragmented.',
			proof: 'Controls can be explained across the full lifecycle: who can deploy, what can run, and where the workload is allowed to operate.',
			outcome: 'Improved cloud control coherence and less drift between cloud policy and engineering reality.',
			tags: ['GCP', 'IAM', 'VPC-SC', 'org policy', 'identity']
		},
		{
			id: 'artifact-incident-response',
			category: 'leadership',
			title: 'Incident response under delivery pressure',
			problem: 'High-pressure security events often reveal whether a team can translate findings into coordinated action without causing collateral delivery chaos.',
			implementation: 'Handled credential and vulnerability response in a way that balanced urgency with platform safety, service-team communication, and clear execution ownership.',
			proof: 'The work is reflected not only in the technical fix but also in how teams describe the collaboration: fast, practical, and low-drama.',
			outcome: 'Reduced downtime risk, better confidence in security response, and stronger trust from engineering peers.',
			tags: ['incident response', 'coordination', 'developer trust', 'delivery continuity']
		},
		{
			id: 'artifact-templates',
			category: 'delivery',
			title: 'Reusable secure workflow templates',
			problem: 'Security programs become expensive when every team must reinvent pipeline logic, policy settings, and remediation patterns independently.',
			implementation: 'Created reusable templates and shared patterns so teams could inherit guardrails and move faster with less setup burden.',
			proof: 'Adoption becomes a platform onboarding conversation rather than a reinvention project in every repository.',
			outcome: 'Faster team onboarding, more consistent standards, and lower long-term enablement cost.',
			tags: ['templates', 'reusability', 'shared patterns', 'platform enablement']
		},
		{
			id: 'artifact-reporting',
			category: 'leadership',
			title: 'Metrics that explain engineering reality',
			problem: 'Security reporting loses credibility when dashboards reflect scanner volume but not delivery impact, remediation quality, or operational movement.',
			implementation: 'Structured reporting around actionable metrics and visible outcomes so leadership and engineering could discuss the same reality from different altitudes.',
			proof: 'Metrics support conversations about risk, throughput, and ownership rather than becoming decorative charts in isolation.',
			outcome: 'Better prioritization at leadership level and less misalignment between teams doing the work and teams reviewing progress.',
			tags: ['metrics', 'leadership reporting', 'engineering reality', 'prioritization']
		},
		{
			id: 'artifact-threat-modeling',
			category: 'appsec',
			title: 'Threat modeling that feeds implementation',
			problem: 'Threat modeling often dies as a workshop artifact and never meaningfully shapes engineering plans or control decisions.',
			implementation: 'Used structured sessions to inform backlog priorities, design expectations, and control mapping rather than treating them as one-off compliance events.',
			proof: 'Threat discussions connect to concrete action items, ownership, and platform decisions teams can actually execute.',
			outcome: 'Higher design clarity and more useful conversations between product, platform, and security participants.',
			tags: ['STRIDE', 'design review', 'backlog impact', 'security planning']
		},
		{
			id: 'artifact-dev-enable',
			category: 'leadership',
			title: 'Developer enablement through clearer remediation',
			problem: 'Teams slow down when security feedback is hard to interpret, detached from code reality, or missing next-step guidance.',
			implementation: 'Focused on making fixes understandable, prioritized, and operationally realistic so developers could move from finding to change faster.',
			proof: 'Testimonials and peer feedback consistently describe the same pattern: help arrives in a way that reduces confusion instead of amplifying it.',
			outcome: 'Faster build unblocking, better team morale around security, and reduced friction between delivery and governance.' ,
			tags: ['developer experience', 'remediation clarity', 'support model', 'faster fixes']
		}
	],
	proofCategories: [
		{ id: 'all', label: 'All evidence' },
		{ id: 'delivery', label: 'Delivery controls' },
		{ id: 'appsec', label: 'AppSec evidence' },
		{ id: 'supply-chain', label: 'Supply chain' },
		{ id: 'kubernetes', label: 'Kubernetes runtime' },
		{ id: 'cloud', label: 'Cloud governance' },
		{ id: 'leadership', label: 'Leadership signals' }
	],
	controlMatrix: [
		{
			control: 'PR governance and code ownership',
			businessValue: 'Prevents uncontrolled code entry into the delivery path.',
			owasp: 'A05 Security Misconfiguration',
			cis: 'Governance and hardening baseline',
			slsa: 'Source integrity foundations',
			nist: 'Protect',
			evidence: 'Review trails, branch protections, owner mappings'
		},
		{
			control: 'Custom secret detection with push protection',
			businessValue: 'Reduces avoidable credential leaks and emergency rotations.',
			owasp: 'A02 Cryptographic Failures / secret exposure handling',
			cis: 'Credential hygiene',
			slsa: 'Source hygiene support',
			nist: 'Protect / Detect',
			evidence: 'Detection events, blocked pushes, rotation actions'
		},
		{
			control: 'Multi-signal vulnerability triage',
			businessValue: 'Focuses effort on exploitable issues without drowning teams in noise.',
			owasp: 'A06 Vulnerable and Outdated Components',
			cis: 'Vulnerability management alignment',
			slsa: 'Artifact risk evaluation support',
			nist: 'Identify / Protect',
			evidence: 'Risk scoring, rationale, remediation paths'
		},
		{
			control: 'SBOM generation and artifact inventory',
			businessValue: 'Improves dependency visibility and incident readiness.',
			owasp: 'A06 Vulnerable and Outdated Components',
			cis: 'Supply-chain visibility',
			slsa: 'Provenance and artifact metadata',
			nist: 'Identify',
			evidence: 'CycloneDX or SPDX inventory attached to builds'
		},
		{
			control: 'Image signing and verification',
			businessValue: 'Raises trust in deployable artifacts and reduces ambiguity.',
			owasp: 'A08 Software and Data Integrity Failures',
			cis: 'Trusted artifact handling',
			slsa: 'Artifact integrity',
			nist: 'Protect',
			evidence: 'Signature metadata and verification outcomes'
		},
		{
			control: 'Digest-based immutable promotion',
			businessValue: 'Prevents rebuild drift between validated and deployed artifacts.',
			owasp: 'A08 Software and Data Integrity Failures',
			cis: 'Deployment consistency',
			slsa: 'Immutable artifact promotion',
			nist: 'Protect / Detect',
			evidence: 'Digest lineage across environments'
		},
		{
			control: 'Admission policy with runtime expectations',
			businessValue: 'Keeps risky workloads out of the cluster by default.',
			owasp: 'A05 Security Misconfiguration',
			cis: 'Kubernetes hardening and workload restrictions',
			slsa: 'Runtime gate support',
			nist: 'Protect',
			evidence: 'Policy decisions, rejected workloads, compliance posture'
		},
		{
			control: 'Runtime detection connected to response',
			businessValue: 'Improves investigation quality and shortens uncertainty windows.',
			owasp: 'Operational detection support',
			cis: 'Runtime monitoring',
			slsa: 'Operational validation support',
			nist: 'Detect / Respond',
			evidence: 'Alert flows, playbooks, escalation outcomes'
		},
		{
			control: 'Cloud identity and governance alignment',
			businessValue: 'Reduces control fragmentation across cloud and delivery teams.',
			owasp: 'Access control and configuration support',
			cis: 'Cloud governance',
			slsa: 'Build identity and policy support',
			nist: 'Protect',
			evidence: 'Identity boundaries, org controls, service posture'
		},
		{
			control: 'Structured leadership reporting',
			businessValue: 'Lets decision-makers reason about risk and throughput using the same data reality as engineers.',
			owasp: 'Program-level support',
			cis: 'Operational governance',
			slsa: 'Assurance story support',
			nist: 'Identify / Respond',
			evidence: 'Metrics dashboards, remediation trends, adoption progress'
		}
	],
	deliveryLanes: [
		{
			id: 'devsecops',
			label: 'DevSecOps Lane',
			headline: 'Controls in the shipping path, with developer-friendly fixes and fewer late-stage surprises.',
			overview: 'This lane focuses on the build and promotion path: governance, scanning, image trust, evidence attachment, and predictable releases.',
			metrics: [
				{ label: 'Delivery posture', value: 'Enforced', note: 'Controls embedded in the normal merge and promotion path.' },
				{ label: 'Team experience', value: 'Guided', note: 'Findings explained with next-step actions, not just stop signs.' },
				{ label: 'Artifact trust', value: 'Verified', note: 'SBOM and identity-oriented evidence linked to artifacts.' }
			],
			goals: [
				'Make the secure path the default path in CI/CD.',
				'Reduce the number of issues discovered only after engineering context is already lost.',
				'Improve artifact trust while preserving developer momentum.'
			],
			operatingNotes: [
				'The build lane should explain why it failed, not just declare failure.',
				'Promotion logic must be deterministic enough that operations can trust what was shipped.',
				'Security tooling should feel like a paved road, not a hidden maze of exceptions.'
			],
			commands: [
				'review → scan → attest → sign → verify → promote',
				'block on exploitable risk, not on every scary-looking score',
				'if the build fails, return the fastest safe fix with context'
			],
			antiPatterns: [
				'Late-stage signoff without evidence',
				'Scanner output that requires security translation every time',
				'Rebuild-based promotion across environments',
				'Controls that only one team knows how to operate'
			]
		},
		{
			id: 'platform',
			label: 'Platform Lane',
			headline: 'Shared systems hardened in ways operators can actually support over time.',
			overview: 'This lane focuses on Kubernetes, runtime expectations, policy enforcement, cluster posture, and shared-system reliability for secure delivery.',
			metrics: [
				{ label: 'Cluster posture', value: 'Hardened', note: 'Benchmark-driven baseline with drift awareness.' },
				{ label: 'Runtime policy', value: 'Guardrailed', note: 'Admission and workload expectations are explicit.' },
				{ label: 'Operator fit', value: 'Supportable', note: 'Controls designed with blast radius and toil in mind.' }
			],
			goals: [
				'Keep risky workloads from entering the cluster.',
				'Make shared runtime behavior predictable for both security and platform teams.',
				'Reduce investigation time with stronger runtime telemetry.'
			],
			operatingNotes: [
				'Platform security has to be operable, not just correct on paper.',
				'Runtime control design should account for support models and on-call reality.',
				'Every cluster rule should help teams know what is allowed and why.'
			],
			commands: [
				'verify workload assumptions before admission',
				'prefer deterministic policy over tribal operational exceptions',
				'pair runtime detection with an owned response path'
			],
			antiPatterns: [
				'Document-only runtime expectations',
				'Wide exceptions that silently become the norm',
				'Operator surprise after policy rollout',
				'Shared systems that depend on manual memory for safe behavior'
			]
		},
		{
			id: 'appsec',
			label: 'AppSec Lane',
			headline: 'Application findings translated into code- and release-friendly remediation guidance.',
			overview: 'This lane focuses on SAST, DAST, manual testing, triage quality, and enabling developers to act quickly and accurately.',
			metrics: [
				{ label: 'Finding quality', value: 'Actionable', note: 'Issues are framed so teams know what to do next.' },
				{ label: 'Priority logic', value: 'Risk-based', note: 'Severity is balanced with exploitability and relevance.' },
				{ label: 'Team response', value: 'Faster', note: 'Lower confusion means quicker, safer fixes.' }
			],
			goals: [
				'Reduce the gap between finding and fix.',
				'Keep AppSec aligned with engineering language and release constraints.',
				'Avoid overwhelming service teams with poorly prioritized noise.'
			],
			operatingNotes: [
				'Developers need a path to resolution, not a pile of abstract risk language.',
				'A good AppSec program builds trust by being technically clear and operationally fair.',
				'Manual depth matters most when it shapes automation and guidance later.'
			],
			commands: [
				'prioritize what is exploitable and reachable first',
				'return example-safe remediation guidance where possible',
				'keep delivery context attached to every finding'
			],
			antiPatterns: [
				'Severity-only prioritization',
				'Scanner-only AppSec posture',
				'Findings with no owner-friendly explanation',
				'Security review that arrives after release decisions are already locked'
			]
		},
		{
			id: 'cloud',
			label: 'Cloud Lane',
			headline: 'Identity, governance, and access boundaries shaped around how workloads really move.',
			overview: 'This lane focuses on cloud posture, IAM thinking, perimeter controls, org policies, and tying cloud decisions back to delivery and platform reality.',
			metrics: [
				{ label: 'Identity strategy', value: 'Short-lived', note: 'Reduce dependence on static credentials where possible.' },
				{ label: 'Boundary clarity', value: 'Explicit', note: 'Cloud access and posture decisions are visible and explainable.' },
				{ label: 'Policy coherence', value: 'Aligned', note: 'Delivery, runtime, and governance reinforce each other.' }
			],
			goals: [
				'Keep cloud governance connected to the delivery lifecycle.',
				'Reduce hidden privilege sprawl and ambiguous access patterns.',
				'Give teams a clearer mental model of where workload trust begins and ends.'
			],
			operatingNotes: [
				'Cloud controls are most useful when service teams can understand their boundaries.',
				'Identity design is often the quiet center of the larger security architecture.',
				'Good governance should make access decisions easier to reason about, not harder.'
			],
			commands: [
				'prefer identity-backed automation over static secrets',
				'align org policy with platform defaults',
				'keep cloud posture tied to workload reality'
			],
			antiPatterns: [
				'Cloud rules disconnected from deployment behavior',
				'Broad identity grants that survive by habit',
				'Perimeter assumptions with weak operational visibility',
				'Governance that only appears during audit season'
			]
		},
		{
			id: 'incident',
			label: 'Incident Lane',
			headline: 'Pressure-handling that protects delivery while moving quickly on the problem that actually matters.',
			overview: 'This lane focuses on response discipline, escalation quality, stakeholder communication, and how control evidence improves incident handling speed.',
			metrics: [
				{ label: 'Response posture', value: 'Coordinated', note: 'Engineering, platform, and security stay aligned under pressure.' },
				{ label: 'Decision style', value: 'Focused', note: 'Containment and remediation are prioritized with context.' },
				{ label: 'Trust outcome', value: 'Higher', note: 'Teams remember whether response helped or hindered delivery.' }
			],
			goals: [
				'Reduce ambiguity during high-pressure events.',
				'Translate findings into owned actions and safe execution order.',
				'Preserve service stability while response work is happening.'
			],
			operatingNotes: [
				'Incidents reveal whether a control system is truly operational or only theoretically well designed.',
				'Communication quality matters almost as much as the technical fix.',
				'A calm, practical response style creates long-term platform trust.'
			],
			commands: [
				'identify blast radius, prioritize containment, then sequence fixes',
				'use evidence and runtime context to avoid overreaction',
				'close the loop with documentation that teams can reuse'
			],
			antiPatterns: [
				'Unowned escalation paths',
				'Panic-driven changes in shared systems',
				'Post-incident learning with no real implementation follow-up',
				'Response language that increases confusion for service teams'
			]
		}
	],
	first90: [
		{
			phase: 'Days 0–30',
			focus: 'Learn the delivery path, map trust boundaries, and earn credibility through fast practical wins.',
			objectives: [
				'Understand current CI/CD, artifact, runtime, and cloud identity flows end to end.',
				'Meet engineering managers, platform leads, QA, and on-call owners to understand friction points.',
				'Identify the top three security issues causing the most delivery confusion or toil.',
				'Establish a simple reporting baseline that reflects team pain, not just scanner volume.'
			],
			deliverables: [
				'Current-state control map with obvious bypasses and friction hotspots.',
				'Fast-remediation guidance for recurring build and deployment blockers.',
				'Shortlist of low-risk, high-trust improvements that can ship early.'
			],
			success: [
				'Teams can describe where security checks happen today.',
				'At least one recurring blocker becomes easier to resolve.',
				'Security conversations start using shared delivery language.'
			]
		},
		{
			phase: 'Days 31–60',
			focus: 'Turn repeated pain points into repeatable controls and cleaner support workflows.',
			objectives: [
				'Convert one or two manual or ambiguous checks into reusable templates or policy-backed defaults.',
				'Improve triage logic for the issues causing the most escalation waste.',
				'Clarify ownership between service teams, platform teams, and security for the main delivery guardrails.',
				'Attach evidence expectations to at least one important promotion or runtime decision path.'
			],
			deliverables: [
				'Reusable secure workflow or policy improvement with clear adoption instructions.',
				'Improved remediation path for a high-friction issue class.',
				'Working dashboard or review cadence that leadership and engineering both trust.'
			],
			success: [
				'Fewer repeat questions for the same build or policy issue.',
				'Service teams can self-serve more of the routine remediation path.',
				'Leadership sees clearer movement in risk and delivery quality.'
			]
		},
		{
			phase: 'Days 61–90',
			focus: 'Scale what works, tighten the trust model, and make the secure path noticeably easier to operate.',
			objectives: [
				'Expand successful controls into adjacent teams or repositories without creating rollout chaos.',
				'Strengthen artifact trust, runtime verification, or cloud identity boundaries where they matter most.',
				'Document response and support expectations so the system can operate smoothly beyond one person.',
				'Present a pragmatic roadmap for the next two quarters grounded in engineering reality.'
			],
			deliverables: [
				'Scaled control rollout backed by feedback from the teams using it.',
				'Documented operating model for remediation, exceptions, and evidence expectations.',
				'Quarterly roadmap linking risk reduction to delivery and platform improvements.'
			],
			success: [
				'Teams feel security is easier to navigate than it was on day one.',
				'Operators and managers trust the control system more because it is more predictable.',
				'The next roadmap is based on observed patterns rather than assumptions.'
			]
		}
	],
	collaborationPrinciples: [
		'Explain the issue in delivery language before escalating the tool output.',
		'Return the fastest safe fix, not just the strictest possible answer.',
		'Treat platform toil and engineering confusion as security design problems too.',
		'Use evidence to settle ambiguity whenever possible.',
		'Design rollout plans that operators can support under pressure.',
		'Prefer reusable defaults over one-team heroics.',
		'Make policy boundaries explicit enough that teams know how to stay inside them.',
		'Leave behind documentation and repeatable patterns, not only point-in-time fixes.'
	],
	issueLanes: [
		{
			title: 'Build blocked by scanner findings',
			body: 'Clarify exploitability, identify the dependency or code path that matters, and return the fastest safe remediation sequence so delivery teams are not forced into guesswork.'
		},
		{
			title: 'Policy rejection at admission time',
			body: 'Translate the policy result into workload terms, explain the expectation clearly, and provide a known-good pattern that service teams can adapt quickly.'
		},
		{
			title: 'Artifact trust ambiguity',
			body: 'Trace signing, digest identity, registry path, and promotion lineage so teams can prove what should run before arguing about what already did.'
		},
		{
			title: 'Cloud access or identity confusion',
			body: 'Map the real workload need, remove broad assumptions, and align access with the smallest identity surface that still supports delivery.'
		},
		{
			title: 'Runtime alert with uncertain impact',
			body: 'Use workload, cluster, and service context to assess blast radius early, then pair the response with an action owner and a calm operating path.'
		},
		{
			title: 'Repeated friction across many teams',
			body: 'Treat it as a platform pattern to redesign rather than a ticket queue to handle forever. If the same confusion appears repeatedly, the system needs a better default.'
		}
	]
};
