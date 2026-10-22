# **CareerOS** 

## **SOFTWARE REQUIREMENTS SPECIFICATION (SRS)** 

_AI-Powered Career Intelligence and Personalized Career Development System_ 

|**Document field**|**Details**|
|---|---|
|System name|CareerOS|
|Future startup / brand direction|Career Polaris|
|Version|1.0 — initial working specification|
|Prepared on|19 October 2026|
|Academic context|B.Tech Semester 7–8, Project Evaluation I|
|Status|Draft SRS derived from the current CareerOS PRD; implementation details<br>remain subject to validation|
|Scope principle|Prioritize the end-to-end core journey; optional features must not block the<br>MVP.|



##### **SYSTEM PURPOSE** 

Specify the observable software behavior, data, interfaces, constraints, and acceptance tests required to connect career discovery with skill-gap analysis, a prerequisite-aware roadmap, and progress tracking. 

CareerOS SRS • Working draft • Page 1 

### **Document Control** 

This SRS converts the current CareerOS product direction into testable software requirements. It is a working draft, not a statement that the software is already built. Requirements marked conditional or optional require a scope decision before implementation. 

|**Version**|**Date**|**Change**|
|---|---|---|
|1.0|2026-10-19|Initial specification based on the CareerOS<br>PRD and prior project decisions.|



### **1. Introduction** 

#### **1.1 Purpose** 

This document defines the expected behavior and constraints of CareerOS so that implementation, testing, academic review, and future maintenance can use the same reference. It specifies functional requirements, interfaces, data structures, quality requirements, and verification criteria. 

#### **1.2 Scope** 

CareerOS is a full-stack career-development system for students and early-career users. The core system accepts a user profile, ranks suitable career options with explanations, compares current skills with target-career requirements, generates an ordered learning roadmap, and displays progress and next actions. Supporting modules may add curated resources, public job-data summaries, skill extraction, job matching, project templates, resume guidance, GitHub analysis, and LinkedIn profile guidance. 

#### **1.3 Intended Audience** 

- Student developer and project teammates, if applicable. 

- Project guide, lecturer, and academic evaluators. 

- Testers reviewing functional behavior and acceptance criteria. 

- Future maintainers who need to understand system boundaries. 

#### **1.4 Definitions and Abbreviations** 

|**Term**|**Definition**|
|---|---|
|PRD|Product Requirements Document: product goals, users, priorities, and<br>outcomes.|
|SRS|Software Requirements Specification: observable and testable software<br>behavior and constraints.|
|MVP|Minimum Viable Product: smallest coherent implementation that<br>demonstrates core value.|
|API|Application Programming Interface used by software components to<br>exchange data.|
|REST|An HTTP-based API style using resources and standard methods.|
|NLP|Natural Language Processing; techniques for processing human-language<br>text.|
|LLM|Large Language Model; a model that generates or transforms text.|
|Skill taxonomy|Canonical list of skill names, categories, and aliases.|
|Dependency graph|Representation of prerequisites between skills or learning tasks.|
|P0/P1/P2|Must-have / should-have / conditional or optional priority levels.|



### **2. Overall Description** 

#### **2.1 Product Perspective** 

CareerOS is planned as a web application with a frontend, backend API, relational database, and optional Python-based data/AI service. The initial implementation should favor a simple modular architecture that one beginner developer can build and explain. 

#### **2.2 Product Functions** 

- Capture and maintain user profile and skill-assessment information. 

- Recommend and explain ranked career options. 

CareerOS SRS • Working draft • Page 2 

- Compare user skills with selected career requirements. 

- Generate a prerequisite-aware roadmap and track task progress. 

- Display progress, readiness indicators, and a next action. 

- Optionally show curated resources, job-market context, job matches, trends, and project templates. 

#### **2.3 User Classes** 

|**User class**|**Expected capabilities**|
|---|---|
|Student / early-career user|Create/edit profile, assess skills, view careers, select target, follow<br>roadmap, update progress.|
|Demo/evaluator user|Use sample data to demonstrate core flows, if demo mode is included.|
|Administrator / maintainer|Maintain career, skill, dependency, resource, and dataset records through<br>controlled tools or seed files. A dedicated admin UI is optional.|



#### **2.4 Operating Environment** 

- Modern desktop and mobile web browsers. 

- Frontend direction: Next.js / React with Tailwind CSS. 

- Backend direction: Node.js / Express REST API. 

- Database direction: PostgreSQL. 

- Optional data/AI service: Python and FastAPI if a separate service is justified. 

- Git/GitHub for version control; deployment platform to be selected later. 

#### **2.5 Design and Implementation Constraints** 

- The developer is a beginner and the project is built within Semester 7–8 academic milestones; requirements must be delivered incrementally. 

- Use controlled public or curated data for the initial version; live large-scale scraping is not required. 

- Do not claim trained NLP/ML models unless they are actually trained and evaluated. 

- Do not guarantee employment, salary, career success, or future job-market outcomes. 

- Do not scrape private LinkedIn information or bypass platform access controls. 

- The AI Interview Simulator is excluded from current scope. 

#### **2.6 Assumptions and Dependencies** 

- A small, curated career catalogue can be created for the MVP. 

- Each supported career can be associated with a reviewed set of required skills and target levels. 

- A suitable public dataset may be available for optional job-market features; source terms and data quality must be checked. 

- Resource links can initially be curated and maintained manually. 

- External integrations and advanced forecasts are not prerequisites for the core system. 

### **3. System Boundary and External Interfaces** 

#### **3.1 System Context** 

The user interacts with the web frontend. The frontend calls the application API. The API reads/writes the relational database and invokes the optional Python service for selected data/AI operations. External data sources are imported through a controlled ingestion process rather than assumed to be continuously live. 

|**External entity**|**Interaction**|**Required for P0?**|
|---|---|---|
|End user|Provides profile, goals, skill information and<br>progress; receives recommendations and roadmap.|Yes|
|PostgreSQL database|Stores profiles, career/skill catalogue,<br>recommendations and roadmap state.|Yes|
|Python data/AI service|Performs optional analysis or recommendation<br>calculations behind a defined interface.|No; core scoring may initially run in backend|
|Public job dataset|Imported for demand summaries and job matching.|No|
|Learning-resource URLs|Opened by user from roadmap tasks.|No; resources may be curated in DB|
|GitHub API|Authorized repository metadata, only if integration is<br>implemented.|No|
|LLM provider|Optional language assistance, only if approved and<br>justified.|No|



CareerOS SRS • Working draft • Page 3 

#### **3.2 User Interface Requirements** 

- UI-01: The interface shall provide navigation to profile/assessment, career discovery, skill gaps, roadmap, and dashboard for the P0 flow. 

- UI-02: The interface shall display loading, success, empty, and error states for data-dependent screens. 

- UI-03: The interface shall label missing or unassessed information distinctly from a confirmed low skill level. 

- UI-04: Recommendation and match explanations shall be visible or reachable from the relevant result. 

- UI-05: Forms shall show validation messages near the relevant fields. 

- UI-06: The interface shall be responsive at the agreed desktop and mobile viewport sizes. 

- UI-07: The interface shall not present optional features as available when they are not implemented. 

#### **3.3 Software Interfaces** 

|**Interface**|**Specification direction**|
|---|---|
|Frontend → Backend|JSON over HTTPS in deployed environments; REST-style endpoints; consistent<br>error response shape.|
|Backend → PostgreSQL|Parameterized queries or ORM; schema and migrations versioned.|
|Backend → Python service|JSON request/response over an internal HTTP API if separate service is used.|
|Data ingestion|Repeatable import script/job with validation and a logged summary.|
|External APIs|Use documented, authorized APIs; handle rate limits, failures, and unavailable<br>services.|



### **4. Functional Requirements** 

Priority key: P0 = required for core MVP; P1 = supporting feature; P2 = optional/conditional. Each requirement is written so it can be verified by inspection, demonstration, or test. 

#### **4.1 User Profile and Assessment** 

|**ID**|**Priority**|**Requirement**|**Verification / acceptance**|
|---|---|---|---|
|FR-UP-01|P0|The system shall allow a user to create<br>and update a profile containing the<br>agreed required fields: education,<br>interests, career goals, experience, and<br>preferences.|Create a profile, reload it, and confirm<br>saved fields persist.|
|FR-UP-02|P0|The system shall allow users to add skills<br>using canonical skill records and record a<br>proficiency level or assessment state.|Added skills map to valid skill IDs and<br>accepted levels.|
|FR-UP-03|P0|The system shall allow a user to continue<br>without claiming skills or work experience<br>they have not entered.|A blank-skill beginner profile can<br>complete onboarding.|
|FR-UP-04|P0|The system shall distinguish self-reported<br>skills, assessed skills, inferred skills, and<br>skills not assessed where these states<br>are used.|Each stored skill state has a<br>source/status value.|
|FR-UP-05|P1|The system shall allow users to record<br>weekly learning-time availability and<br>preferred learning formats.|Values persist and are available to<br>roadmap logic.|
|FR-UP-06|P0|The system shall validate required fields<br>and reject invalid field formats with a<br>readable message.|Invalid input is not saved and an<br>actionable error is shown.|
|FR-UP-07|P0|The system shall allow users to review<br>and correct their profile and assessment<br>data.|Updated data is persisted and<br>downstream results can be refreshed.|



#### **4.2 Career Catalogue and Recommendation** 

|**ID**|**Priority**|**Requirement**|**Verification / acceptance**|
|---|---|---|---|
|FR-CR-01|P0|The system shall maintain a catalogue of<br>supported careers with a stable ID, title,<br>description, and linked skill<br>requirements.|Each supported career has required<br>catalogue fields.|
|FR-CR-02|P0|The system shall calculate a career<br>suitability score or rank using<br>documented factors and weights.|Same version and same inputs produce<br>reproducible results.|
|FR-CR-03|P0|The system shall return a ranked list of<br>supported careers for a sufficiently<br>complete profile.|Results are ordered by score with a<br>defined tie rule.|
|FR-CR-04|P0|The system shall provide explanations for<br>displayed recommendations using actual<br>profile values,career requirements,|Each explanation can be traced to stored<br>input or a documented rule.|



CareerOS SRS • Working draft • Page 4 

|||preferences, and demand data where<br>available.||
|---|---|---|---|
|FR-CR-05|P0|The system shall allow the user to open a<br>career detail and select a target career.|Selected career ID is passed to skill-gap<br>analysis.|
|FR-CR-06|P0|The system shall indicate when profile<br>data is insufficient for a reliable ranking.|Incomplete profiles show a prompt or<br>lower-confidence/limited-data state.|
|FR-CR-07|P0|The system shall store enough metadata<br>to reproduce a recommendation,<br>including relevant inputs or input<br>snapshot, scoring version, and result<br>timestamp where practical.|A test result can be explained and<br>recreated from stored records.|
|FR-CR-08|P0|The system shall not describe a suitability<br>score as a guarantee of aptitude or<br>success.|UI labels scores as guidance or estimated<br>fit.|



#### **4.3 Skill-Gap Analysis** 

|**ID**|**Priority**|**Requirement**|**Verification / acceptance**|
|---|---|---|---|
|FR-SG-01|P0|The system shall compare a selected<br>career's required skills and target levels<br>with the user's current skill records.|Output lists required skills and<br>current/target states.|
|FR-SG-02|P0|The system shall classify each compared<br>skill using documented categories such<br>as strong, developing, priority gap,<br>missing, or not assessed.|Classification follows defined thresholds<br>and distinguishes not assessed.|
|FR-SG-03|P0|The system shall show why a skill is<br>identified as a gap.|Explanation includes target requirement<br>and available current evidence.|
|FR-SG-04|P0|The system shall identify prerequisite<br>skills that should be completed before<br>dependent roadmap tasks.|Known prerequisites are surfaced in the<br>gap/roadmap flow.|
|FR-SG-05|P0|The system shall refresh skill-gap results<br>when relevant profile, assessment, or<br>career requirement data changes.|Changed test input produces updated<br>output.|
|FR-SG-06|P0|The system shall handle missing career-<br>skill requirements without silently<br>treating them as confirmed requirements.|Missing requirement data is flagged or<br>excluded with a documented rule.|



#### **4.4 Roadmap Generation and Progress** 

|**ID**|**Priority**|**Requirement**|**Verification / acceptance**|
|---|---|---|---|
|FR-RM-01|P0|The system shall generate a roadmap for<br>a selected target career from the user's<br>current skill state and the career's<br>required skills.|Roadmap tasks correspond to identified<br>skill needs.|
|FR-RM-02|P0|The system shall order roadmap tasks so<br>that defined prerequisites appear before<br>dependent tasks.|All valid prerequisite edges satisfy the<br>ordering rule.|
|FR-RM-03|P0|The system shall detect dependency<br>cycles or invalid prerequisite references<br>and shall not present an invalid order as<br>valid.|Test graph with cycle produces a<br>controlled error/flag.|
|FR-RM-04|P0|The system shall prioritize roadmap tasks<br>using documented factors such as gap<br>severity, prerequisite importance, and<br>career relevance.|Task order can be explained using rules or<br>metadata.|
|FR-RM-05|P0|The system shall allow users to set<br>roadmap-task status to not started, in<br>progress, or completed.|Status persists after reload.|
|FR-RM-06|P0|The system shall calculate roadmap<br>progress from defined task statuses.|Displayed progress matches the<br>documented calculation.|
|FR-RM-07|P1|The system shall attach curated learning<br>resources to roadmap tasks when a<br>matching resource exists.|Resource is linked to the relevant<br>skill/task.|
|FR-RM-08|P1|The system shall attach a relevant project<br>template or milestone when one is<br>mapped to the task/career.|Project suggestion references mapped<br>skills and deliverables.|
|FR-RM-09|P1|The system shall update roadmap<br>recommendations when progress or<br>learning-time availability changes, using<br>documented adaptation rules.|Changed input updates affected<br>tasks/order and explains changes.|
|FR-RM-10|P0|The system shall communicate when a<br>roadmap cannot be generated because<br>required career or dependency data is<br>missing.|User sees a clear incomplete-data state,<br>not fabricated steps.|
|FR-RM-11|P2|The system may estimate task duration<br>where maintained effort data exists.|Estimates are labelled as estimates and<br>absent when no basis exists.|



CareerOS SRS • Working draft • Page 5 

#### **4.5 Career Readiness Dashboard** 

|**ID**|**Priority**|**Requirement**|**Verification / acceptance**|
|---|---|---|---|
|FR-DB-01|P0|The system shall display the selected<br>target career, roadmap progress, and<br>outstanding priority tasks when available.|Dashboard values match stored career<br>and task records.|
|FR-DB-02|P0|The system shall recommend a next<br>action based on incomplete prerequisites<br>or prioritized skill gaps.|Displayed action maps to the roadmap's<br>next eligible task.|
|FR-DB-03|P1|The system shall show skill-readiness<br>and project-evidence summaries when<br>the supporting data exists.|Summaries link to the records used to<br>calculate them.|
|FR-DB-04|P0|The system shall distinguish unavailable<br>optional-module data from a zero score<br>or completed status.|No unsupported value is displayed.|



#### **4.6 Job-Market Dataset and Skill Extraction** 

|**ID**|**Priority**|**Requirement**|**Verification / acceptance**|
|---|---|---|---|
|FR-JM-01|P1|The system shall import a selected<br>public/permitted job dataset through a<br>repeatable process.|Import log reports records read,<br>accepted, rejected, and duplicates.|
|FR-JM-02|P1|The system shall normalize selected job<br>fields such as role titles, skills, locations,<br>and work modes using documented<br>rules.|A fixed sample produces expected<br>normalized fields.|
|FR-JM-03|P1|The system shall identify and handle<br>duplicate and incomplete job records.|Documented rules are applied and<br>testable.|
|FR-JM-04|P1|The system shall display job-market<br>summaries only for fields and time ranges<br>supported by the dataset.|Each summary identifies the relevant<br>coverage/period.|
|FR-JM-05|P1|The system shall maintain a skill<br>taxonomy with canonical names and<br>aliases.|Known aliases resolve to the same<br>canonical skill.|
|FR-SE-01|P1|The system shall identify skill mentions in<br>supported job text using the selected<br>taxonomy and documented<br>matching/normalization rules.|A manually labelled test sample can be<br>checked against extracted results.|
|FR-SE-02|P2|The system may allow review and<br>correction of extracted skills before<br>downstream use.|User corrections are applied to the<br>reviewed record.|
|FR-JM-06|P1|The system shall not label an imported<br>static dataset as live job-market data.|UI identifies source or time coverage<br>where feasible.|



#### **4.7 Learning Resources and Job Matching** 

|**ID**|**Priority**|**Requirement**|**Verification / acceptance**|
|---|---|---|---|
|FR-LR-01|P1|The system shall store curated resources<br>with title, URL, type, mapped skill, and<br>level where known.|Resources can be retrieved by mapped<br>skill.|
|FR-LR-02|P1|The system shall show mapped<br>resources for roadmap skills when<br>available.|Resource list corresponds to the task's<br>skill mapping.|
|FR-JB-01|P1|The system shall compare a user profile<br>with a selected available job record using<br>a documented skill-matching method.|Same inputs and method version produce<br>reproducible match output.|
|FR-JB-02|P1|The system shall show a match<br>score/category plus matched and<br>missing skills.|Displayed skills agree with comparison<br>output.|
|FR-JB-03|P1|The system shall label job matching as<br>guidance and not as a hiring or interview<br>guarantee.|No guarantee language appears in<br>results.|



#### **4.8 Trend Estimation** 

|**ID**|**Priority**|**Requirement**|**Verification / acceptance**|
|---|---|---|---|
|FR-FT-01|P1|The system shall calculate historical<br>posting counts or other documented<br>demand indicators from available data.|Summary matches the selected dataset<br>and period.|
|FR-FT-02|P1/P2|The system shall classify trends as<br>growing, stable, or declining only when<br>data coverage and observation count<br>meet documented thresholds.|Insufficient data produces an insufficient-<br>evidence state.|
|FR-FT-03|P2|If forecasting is implemented, the system<br>shall identify the method, training period,<br>evaluation approach,and|Forecast is reproducible and limitations<br>are visible.|



CareerOS SRS • Working draft • Page 6 

|||uncertainty/limitations.||
|---|---|---|---|
|||The system shall not present a trend||
|FR-FT-04|P1|estimate as a guaranteed five-year|Output labels it as an estimate.|
|||outcome.||



#### **4.9 Supporting Features — Conditional** 

|**ID**|**Priority**|**Requirement**|**Verification / acceptance**|
|---|---|---|---|
|FR-PB-01|P2|If project templates are implemented,<br>each template shall define objective,<br>related skills, technology, difficulty,<br>deliverables, and optional<br>duration/milestones.|Required template fields are present.|
|FR-RS-01|P2|If resume analysis is implemented, the<br>system shall compare user-provided<br>resume content with target skills and<br>show evidence-based suggestions.|Suggestions do not fabricate experience<br>or credentials.|
|FR-GH-01|P2|If GitHub analysis is implemented, the<br>system shall use authorized/public<br>repository information and identify which<br>observable signals were examined.|Displayed signals are traceable to<br>available repository metadata.|
|FR-LI-01|P2|If LinkedIn guidance is implemented, the<br>system shall provide a user-editable<br>checklist and shall not scrape private<br>data or modify a profile automatically.|Guidance is shown without unauthorized<br>collection/actions.|



### **5. Data Requirements** 

#### **5.1 Logical Data Entities** 

|**Entity**|**Required / representative fields**|**Rules**|
|---|---|---|
|User|user_id, account identifier, created_at|Unique ID; credentials never stored as plain text.|
|UserProfile|user_id, education, interests, goals, experience,<br>preferences, weekly_time|User can review/update; optional fields may be empty.|
|Skill|skill_id, canonical_name, category, aliases|Canonical name unique within the chosen taxonomy.|
|UserSkill|user_id, skill_id, proficiency/status, source, updated_at|Distinguish self-reported, assessed, inferred, not<br>assessed.|
|Career|career_id, title, description, source/version|Stable ID; title is display text.|
|CareerSkillRequirement|career_id, skill_id, target_level, importance, source|No duplicate career-skill pair unless explicitly versioned.|
|Recommendation|user_id, career_id, score, reasons, scoring_version,<br>created_at|Score range and tie rule documented.|
|JobPosting|source, source_id if available, title, location, skills, date,<br>description, work_mode|Source and coverage retained; optional fields may be<br>null.|
|LearningResource|resource_id, title, URL, type, skill_id, level,<br>source/verified_at|URLs are validated; links may become unavailable.|
|SkillDependency|prerequisite_skill_id, dependent_skill_id, source|No self-edge; cycle detection required.|
|Roadmap|roadmap_id, user_id, career_id, version, created_at|Associated with one target career per roadmap version.|
|RoadmapTask|task_id, roadmap_id, skill_id/task, order, priority, status,<br>resource/project refs|Status restricted to defined values.|
|AssessmentResult|user_id, skill_id/assessment_id, result, method, date|Do not infer a formal certification from self-rating.|
|ProjectTemplate|template_id, objective, skills, tech, difficulty,<br>deliverables|Optional feature; fields validated if enabled.|
|JobMatch|user_id, job_id, score, matched_skills, missing_skills,<br>method_version|Match is guidance, not a hiring prediction.|



#### **5.2 Data Validation** 

- Required identifiers must be present and unique. 

- Foreign-key references must point to existing records. 

- Proficiency values and task statuses must use documented enumerations. 

- Text input must be length-limited and validated before storage/use. 

- Imported records must be checked for duplicates, malformed fields, and unsupported values. 

- All calculations must define how null, missing, and unassessed values are handled. 

- Scoring rules, career requirements, and taxonomy changes should be versioned or recorded. 

#### **5.3 Data Retention and Deletion** 

Before real-user deployment, define how account/profile data is deleted, how long logs are retained, and whether external services receive any user content. During early development, use synthetic or test profiles wherever possible. 

CareerOS SRS • Working draft • Page 7 

### **6. External Interface Requirements** 

#### **6.1 API Conventions** 

- API-01: API requests and responses shall use JSON for application data. 

- API-02: Deployed API traffic shall use HTTPS. 

- API-03: The API shall return suitable HTTP status codes and a consistent error object containing a machine-readable code and humanreadable message. 

- API-04: Endpoints that modify data shall validate payloads and enforce access control. 

- API-05: List endpoints, if present, shall have bounded pagination or result limits. 

- API-06: External-service failures shall not crash unrelated core flows. 

#### **6.2 Candidate Endpoint Map** 

These are suggested endpoint shapes to guide the design, not finalized API contracts. Confirm naming, payloads, authentication, and error schema during implementation. 

|**Method / path**|**Purpose**|**Priority**|
|---|---|---|
|POST /api/profile|Create/update profile|P0|
|GET /api/profile|Retrieve current profile|P0|
|PUT /api/profile|Update current profile|P0|
|GET /api/careers|List supported careers|P0|
|GET /api/careers/{careerId}|Career details and required skills|P0|
|POST /api/recommendations|Calculate ranked career recommendations|P0|
|GET /api/careers/{careerId}/gaps|Calculate current-versus-required skill gaps|P0|
|POST /api/roadmaps|Generate roadmap for a selected career|P0|
|GET /api/roadmaps/{roadmapId}|Retrieve roadmap and tasks|P0|
|PATCH /api/roadmaps/{roadmapId}/tasks/{taskId}|Update task status|P0|
|GET /api/dashboard|Retrieve progress and next action|P0|
|GET /api/resources?skillId=...|Find resources mapped to a skill|P1|
|GET /api/jobs|Search/list imported job records|P1|
|POST /api/job-matches|Compare profile with selected job|P1|
|GET /api/trends|Get historical demand/trend summaries|P1/P2|



### **7. Non-Functional Requirements** 

|**ID**|**Quality area**|**Requirement / verification**|
|---|---|---|
|NFR-01|Usability|Core screens shall use consistent navigation and<br>plain-language labels; validate through task<br>walkthroughs.|
|NFR-02|Accessibility|Interactive controls shall have labels; keyboard<br>operation and readable contrast shall be checked on<br>core screens.|
|NFR-03|Responsiveness|Core flow shall be usable at agreed desktop and<br>mobile viewport sizes.|
|NFR-04|Performance|Measure profile, recommendation, gap, roadmap,<br>and dashboard response times under a documented<br>local test setup; numeric targets are to be finalized<br>after baseline measurement.|
|NFR-05|Reliability|Missing data and failed optional services shall<br>produce controlled states rather than unhandled<br>crashes.|
|NFR-06|Security|Validate inputs, protect private routes, enforce user-<br>level data access, and never commit secrets to<br>version control.|
|NFR-07|Privacy|Collect only necessary data and provide<br>review/correction of user-entered profile data.|
|NFR-08|Transparency|Important scores, matches, and trends shall have<br>visible explanations or method/coverage notes.|
|NFR-09|Maintainability|Keep modules and core calculations separate<br>enough to test; document setup and data<br>assumptions.|
|NFR-10|Auditability|Store calculation/version metadata sufficient to<br>reproduce key recommendation and roadmap<br>outputs where practical.|
|NFR-11|Portability|Support current major browsers selected for testing;<br>record browser/device test coverage.|



CareerOS SRS • Working draft • Page 8 

The system shall not guarantee hiring or infer personal ability from unsupported proxies. 

Ethical behavior 

NFR-12 

### **8. Security and Privacy Requirements** 

- SEC-01: If accounts are enabled, passwords shall be handled using an established secure authentication library/provider and never stored as plaintext. 

- SEC-02: Each protected request shall verify that the requester is permitted to access or modify the referenced user's records. 

- SEC-03: The application shall validate and constrain user-supplied data before processing or persistence. 

- SEC-04: Secrets, tokens, and database credentials shall be kept out of source control and client-side bundles. 

- SEC-05: Logs shall avoid unnecessary sensitive profile or resume content. 

- SEC-06: Optional external integrations shall use authorized access and only request necessary permissions. 

- SEC-07: Resume or profile text shall not be sent to an external AI service unless the integration is disclosed and the data-handling implications are reviewed. 

- SEC-08: The system shall not scrape private LinkedIn information or bypass platform restrictions. 

- SEC-09: Users shall be able to review and correct profile/skill information used in recommendations where practical. 

### **9. Core Algorithms and Observable Rules** 

#### **9.1 Career Recommendation** 

- Input: profile, current skill state, preferences, career catalogue, career-skill requirements, and optional demand indicators. 

- Processing: normalize available factors, apply documented weights/scoring rules, handle missing values, rank candidates, and construct explanations. 

- Output: ranked career IDs, scores/categories, explanation factors, scoring version, and data limitations. 

- Verification: same version and inputs must produce the same result; explanations must map to input data or explicit rules. 

#### **9.2 Skill-Gap Analysis** 

- Input: current user-skill states and selected career requirements. 

- Processing: align canonical skill IDs; compare current and target levels; apply documented classification thresholds; respect 'not assessed'. 

- Output: per-skill current state, target state, gap category, reason, and known prerequisites. 

- Verification: unit tests cover below-target, meets-target, missing, unassessed, alias, and incomplete-requirement cases. 

#### **9.3 Roadmap Generation** 

- Input: priority gaps, skill dependencies, resource/project mappings, user progress, and optional study-time preference. 

- Processing: validate dependency graph; detect cycles; order prerequisites; prioritize eligible tasks using documented rules; attach mapped resources/projects; retain task status. 

- Output: ordered roadmap tasks with reasons, prerequisite links, status, and optional resources/project links. 

- Verification: for each dependency A → B, A must appear before B unless A is already satisfied; invalid graphs must be flagged. 

#### **9.4 Trend Analysis** 

Initial version should summarize historical records and state their time range. A forecast is conditional: it may be included only when adequate time-series coverage and a validation method exist. Forecasts must be labelled estimates and must not be represented as guaranteed future demand. 

### **10. Error Handling and Edge Cases** 

|**Scenario**|**Expected behavior**|
|---|---|
|Profile has no skills|Allow beginner flow; prompt for assessment or mark skills not assessed; do not<br>fabricate proficiency.|
|Profile is incomplete|Ask for required fields or show a limited-confidence state.|
|No career matches catalogue filters|Show no-results state and allow profile adjustment.|
|Career has no required skills mapped|Explain that gap analysis/roadmap cannot be reliable until data is added.|
|Skill alias not recognized|Leave unresolved or ask for correction; do not silently map to an unrelated skill.|
|Dependency graph contains a cycle|Flaginvalid data and do not claim a validprerequisite order.|



CareerOS SRS • Working draft • Page 9 

|No learning resource for a skill|Show no mapped resource and preserve the roadmap task.<br>l|
|---|---|
|Job dataset is unavailable|Core career/gap/roadmap flow remains usable without market insights.|
|External API fails or rate-limits|Show a recoverable error and avoid failing unrelated modules.|
|User requests another user's record|Deny access without disclosing protected information.|
|Optional module not implemented|Hide or label as unavailable; do not show fabricated metrics.|
|Trend data is insufficient|Show insufficient evidence rather than a forced growing/stable/declining label.|



### **11. Verification and Test Plan** 

#### **11.1 Core End-to-End Acceptance Test** 

Given a valid profile, a supported career catalogue, skill requirements, and a valid dependency graph, the system shall allow the user to receive explainable ranked careers, select a target, inspect skill gaps, generate an ordered roadmap, update task statuses, and see corresponding dashboard progress and next action. 

#### **11.2 Test Types** 

- Unit tests: scoring factors, gap classification, dependency validation/order, progress calculation, skill normalization. 

- Integration tests: frontend/API/database interactions and optional service boundaries. 

- API tests: valid requests, invalid payloads, access control, status codes, and error formats. 

- Data tests: import counts, normalization, duplicate rules, missing fields, and repeatability. 

- UI tests: core journey, form validation, empty/error/loading states, responsive layout. 

- Security tests: access to another user's data, secret handling, input validation. 

- Manual explainability review: verify each explanation is supported by data/rules. 

- Regression tests: rerun core tests after changes to requirements, taxonomy, scoring, or dependencies. 

#### **11.3 MVP Exit Criteria** 

- All P0 requirements selected for the release pass their acceptance tests. 

- The core journey works from profile to dashboard using representative test data. 

- Career scores and skill-gap categories are reproducible and documented. 

- Roadmap prerequisite ordering is validated and invalid dependency graphs are detected. 

- Task updates persist and dashboard progress reflects them. 

- Missing data and optional-service failures have understandable behavior. 

- Known limitations, data provenance, setup steps, and test results are documented. 

### **12. Requirements Traceability** 

|**Product goal**|**SRS requirements**|**Evidence**|
|---|---|---|
|Understand user|FR-UP-01 to FR-UP-07|Profile/assessment test cases.|
|Recommend suitable careers|FR-CR-01 to FR-CR-08|Fixed-input ranking and explanation tests.|
|Identify skill gaps|FR-SG-01 to FR-SG-06|Comparison and classification tests.|
|Generate actionable roadmap|FR-RM-01 to FR-RM-11|Dependency/order, status and adaptation tests.|
|Show progress / next action|FR-DB-01 to FR-DB-04|Dashboard calculation and state tests.|
|Use market context responsibly|FR-JM / FR-SE / FR-FT|Dataset and trend coverage checks.|
|Support job readiness|FR-LR / FR-JB / FR-PB / FR-RS / FR-GH / FR-LI|Conditional feature tests if implemented.|



### **13. Requirements to Finalize** 

These are open decisions, not hidden assumptions. Resolve them before treating this SRS as baselined. 

- Initial career catalogue: which roles and career families are in the first release? 

- Proficiency scale: what are the exact levels and definitions? 

- Recommendation scoring: exact factors, weights, normalization, missing-data handling, and tie-breaking. 

- Skill-gap thresholds: exact rule for strong/developing/priority gap/missing. 

- Dependency source: who creates/reviews prerequisites and how cycles are handled in the admin workflow. 

- Authentication: account-based release or demo mode first? 

CareerOS SRS • Working draft • Page 10 

- 

- 

- 

- 

- Dataset: chosen source, licence/terms, geography, date range, fields, and refresh method. 

- Resource curation: source policy, verification frequency, and broken-link handling. 

- Performance targets: numeric response-time targets after prototype baseline measurements. 

- Optional modules: which of job matching, trend estimation, project builder, resume, GitHub, and LinkedIn will be delivered. 

### **14. Semester Delivery Mapping** 

|**Stage**|**SRS-aligned deliverables**|
|---|---|
|Semester 7: analysis|Problem and user assumptions, reviewed literature, PRD, this SRS draft, open<br>decisions.|
|Semester 7: design|Use-case diagram, activity/sequence diagrams as required, DFD/UML,<br>ER/database model, wireframes, API contract draft.|
|Semester 7: feasibility|Stack justification, data source assessment, algorithm plan, risk register, test<br>plan.|
|Semester 7: prototype|Small vertical slice if feasible: profile, small career catalogue, explainable<br>recommendation.|
|Semester 8: core build|Profile, career recommendation, gap analysis, dependency-aware roadmap,<br>progress and dashboard.|
|Semester 8: supporting features|Resources, job dataset/matching, and selected optional features based on time.|
|Semester 8: verification|Functional/integration/usability/security tests, evaluation, deployment, final<br>report and demo.|



### **15. Exclusions** 

- AI Interview Simulator. 

- Large-scale continuous job scraping as a required dependency. 

- Guaranteed job placement, salary, or career prediction. 

- Full commercial ATS certification or guaranteed resume pass score. 

- Unauthorized private LinkedIn scraping or automatic profile modification. 

- Training a foundation model from scratch. 

- Advanced agentic workflows and automated job applications. 

### **16. Final Specification Statement** 

The initial CareerOS release shall prioritize a coherent, explainable end-to-end journey: capture the user's current state, recommend supported careers, compare skill gaps, generate a prerequisite-aware roadmap, track task progress, and show a meaningful next action. Supporting data and optional modules shall be introduced only when their data quality, feasibility, and value are sufficient. Any change to priority, scope, algorithms, or interfaces should be recorded and reflected in this SRS before implementation/testing relies on it. 

CareerOS SRS • Working draft • Page 11 

