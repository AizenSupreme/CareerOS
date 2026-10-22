# **CareerOS** 

## **PRODUCT REQUIREMENTS DOCUMENT (PRD)** 

_AI-Powered Career Intelligence and Personalized Career Development System_ 

|**Document field**|**Details**|
|---|---|
|Product|CareerOS|
|Future startup / brand direction|Career Polaris|
|Version|1.0 — consolidated working baseline|
|Prepared on|19 October 2026|
|Academic context|B.Tech Semester 7–8, Project Evaluation I|
|Build context|Solo student developer; beginner-friendly phased implementation|
|Status|Draft baseline for review; not a claim that features are already<br>implemented|



##### **CORE PROMISE** 

Help a person move from “I don’t know which career suits me or what to learn” to “I understand my direction and have a measurable plan to become job-ready.” 

CareerOS PRD • Working baseline • Page 1 

### **Document Control and How to Use This PRD** 

This document consolidates the CareerOS decisions discussed so far. It defines product direction, users, scope, features, success measures, data needs, technical direction, risks, and delivery phases. It is a product-planning baseline, not an SRS and not proof that features have already been implemented. 

Use the PRD to agree on what to build and why. The SRS should convert selected requirements into precise, testable software behaviors. System-design documents should then describe architecture, database schema, APIs, UML/DFD, and detailed data flows. 

|**Term**|**Meaning**|
|---|---|
|MVP|Minimum viable product: the smallest coherent version that proves<br>the core CareerOS journey.|
|P0 / Must|Required for the core demonstration.|
|P1 / Should|Important supporting capability after the core works.|
|P2 / Could|Lightweight, conditional, or optional if time permits.|
|Future|Outside the initial MVP.|
|Explainable output|A result traceable to user inputs, structured data, or documented<br>rules—not an unexplained AI assertion.|



### **1. Executive Summary** 

CareerOS is a full-stack career intelligence and career-development platform for students and early-career users. It aims to connect career discovery, skill assessment, skill-gap analysis, personalized learning, practical project guidance, and progress tracking in one workflow. 

The central differentiator is integration. CareerOS should not merely suggest a job title or list courses; it should explain why a career may fit, identify what the user needs to learn, sequence those skills based on prerequisites, attach resources and projects, and show what to do next. 

#### **1.1 Product One-Liner** 

CareerOS turns career uncertainty into an explainable, personalized, measurable path toward job readiness. 

#### **1.2 Vision** 

Become a trusted career-development workspace where users can understand their options, see skill gaps, follow an achievable plan, build evidence of skills, and track readiness against real-world role requirements. 

#### **1.3 Product Principles** 

- Explain recommendations and show the evidence behind them. 

- Connect assessment, career choice, skill gaps, roadmap, projects, and progress. 

- Build a reliable core before expanding feature breadth. 

- Be honest about AI: distinguish rules, text matching, statistical estimates, ML, and LLM-generated content. 

- Support users starting from zero; do not assume prior skills or experience. 

- Show uncertainty and data limitations; never guarantee employment or future demand. 

- Protect user data and use authorized integrations only. 

### **2. Problem and Opportunity** 

#### **2.1 Problem Statement** 

Students and early-career users can struggle to choose suitable careers and become job-ready because career information is scattered, skill requirements are unclear, and personalized learning and practical project guidance are often disconnected. Existing tools may address career exploration, courses, resume review, or job listings separately rather than connecting them into one trackable development path. 

CareerOS PRD • Working baseline • Page 2 

#### **2.2 Problems to Validate** 

- Users may not know which careers fit their interests, education, current skills, and preferences. 

- Users may not know which skills a target role requires or how their current abilities compare. 

- Course lists rarely tell a beginner what to learn first or which prerequisites matter. 

- Users may complete learning content without building practical projects that demonstrate ability. 

- Users may not know how their resume, portfolio, GitHub, or skills compare with a target role. 

- Job-market information can be inconsistent, outdated, or difficult to turn into an action plan. 

#### **2.3 Opportunity** 

CareerOS can differentiate through orchestration: structured career data, skill requirements, dependency-aware sequencing, curated resources, projects, and progress measurement work together. Literature on competency-based career recommendations, skill-based job matching, knowledge graphs, and personalized learning paths informs this direction; user research is still needed to validate demand. 

### **3. Goals, Non-Goals, and Success** 

#### **3.1 Goals** 

- Offer understandable career suggestions and allow comparison. 

- Show the difference between a user's current skills and a target role's requirements. 

- Generate an ordered, prerequisite-aware roadmap. 

- Connect learning tasks to resources and practical projects. 

- Make progress and the next recommended action visible. 

- Use a controlled public job-posting dataset for market context and matching. 

- Produce a portfolio-grade full-stack project that can be explained and defended in interviews. 

#### **3.2 Non-Goals for Initial MVP** 

- Guaranteeing employment, salary, promotion, or career outcomes. 

- Replacing professional career counselling or making irreversible decisions for users. 

- Building a global live job crawler at production scale. 

- Training a large foundation model from scratch. 

- Claiming highly accurate five-year predictions without adequate data and evaluation. 

- Providing a complete commercial ATS score or guaranteeing resume pass rates. 

- Scraping private LinkedIn data or taking actions without authorization. 

- AI Interview Simulator: explicitly removed from the current scope; do not reintroduce unless the user asks. 

#### **3.3 Proposed Success Metrics** 

These are proposed targets, not achieved results. Adjust them after a prototype and pilot test. 

|**Area**|**Metric**|**Initial evidence / target**|
|---|---|---|
|Onboarding|Profile completion|Pilot users can complete the required profile with<br>minimal help.|
|Recommendations|Explainability|Each displayed recommendation has a score/rank<br>and data-backed reasons where data permits.|
|Skill gaps|Traceability|Each gap links to a target requirement and current<br>profile/assessment state.|
|Roadmap|Actionability|Tasks are ordered, prerequisites respected,<br>resources/projects linked where available.|
|Dashboard|Next action|One clear next action is derived from priority gaps or<br>incomplete prerequisites.|
|Data quality|Provenance|Source, time period, cleaning, duplicate handling,<br>and limitations documented.|
|Testing|Core journey|Core acceptance tests pass on representative test<br>profiles.|
|Usability|Task completion|Pilot users can complete core tasks; issues and<br>completion rates are recorded.|
|Reliability|Error handling|Invalid input, missing data, and unavailable services<br>produce understandable errors.|



CareerOS PRD • Working baseline • Page 3 

### **4. Target Users and Personas** 

|**Persona**|**Needs / pain points**|**CareerOS value**|
|---|---|---|
|University student exploring careers|Unclear direction, limited experience, unsure<br>what skills matter.|Career discovery, assessment, gap analysis,<br>beginner roadmap.|
|Student targeting a role|Has a goal but lacks a learning sequence and<br>project plan.<br>i|Role requirements, dependency-aware<br>roadmap, projects and progress.|
|Early-career job seeker|Needs to compare profile with job requirements<br>and improve evidence.|Job matching, missing-skill explanation,<br>resume/GitHub guidance.|
|Self-directed learner / career switcher|Needs a structured transition path and may have<br>time constraints.|Skill-gap view, prerequisites, resources and<br>adaptive plan.|



#### **4.1 Initial Target Segment** 

Begin with university students and early-career users. This is a realistic segment for the academic project to validate before attempting to serve every occupation, country, and experience level. 

#### **4.2 User Needs** 

- I can enter education, interests, skills, goals, preferences, and study-time availability. 

- I can understand why a career is recommended. 

- I can select a target career and see required versus current skills. 

- I can receive an ordered plan with prerequisites, resources, and practical projects. 

- I can record progress and see what to do next. 

- I can compare my profile with available job records without being promised a job. 

- I can correct inaccurate profile details or extracted skills. 

### **5. Scope and Prioritization** 

|**Priority**|**Definition**|
|---|---|
|P0 — Core MVP|Essential to demonstrate the central user journey.|
|P1 — Supporting MVP|Valuable after P0 is stable.|
|P2 — Lightweight / conditional|Limited version or only if time/access permits.|
|Future|Not required for the initial MVP.|



|**Module**|**Priority**|**Initial expectation**|
|---|---|---|
|User Profile & Assessment|P0|Education, interests, goals, skills, proficiency,<br>and learning-time availability.|
|Career Recommendation|P0|Explainable multi-factor scoring and ranked<br>careers.|
|Skill-Gap Analysis|P0|Compare user skills with target-career<br>requirements.|
|Personalized Roadmap Generator|P0|Dependency-aware sequence, priorities,<br>resources, projects, progress.|
|Career Readiness Dashboard|P0|Progress, readiness signals, and next action.|
|Job-Market Intelligence|P1|Controlled public dataset, cleaning, demand<br>summaries.|
|Skill Extraction|P1|Taxonomy-based text matching and<br>normalization; not falsely labelled as trained<br>NLP.|
|Learning Resources|P1|Curated resources mapped to skills and levels.|
|Internship/Job Matching|P1|Compare profile with job records; show<br>matched/missing skills.|
|Five-Year Trend Estimation|P1/P2|Historical trends first; forecasting only if data<br>supports it.|
|Project Builder|P2|Template-based projects with skills, tasks,<br>milestones.|
|Resume Intelligence|P2|Basic text/skill comparison; not a full ATS.|
|GitHub Analysis|P2|Start with UI/design; authorized API analysis if<br>feasible.|
|LinkedIn Improvement|P2|Profile checklist/guidance; no unauthorized<br>scraping.|



CareerOS PRD • Working baseline • Page 4 

AI Interview Simulator 

Explicitly excluded. 

Removed 

### **6. End-to-End User Journey** 

1. User creates an account or opens a supported demo flow. 

2. User completes a profile: education, interests, skills, goals, preferences, and available study time. 

3. User completes a baseline assessment or self-rates skills; the system records the status and source where possible. 

4. CareerOS ranks career options and explains the main reasons for each. 

5. User selects a target career and reviews its skill requirements. 

6. CareerOS compares current and target skill states and classifies strengths, developing skills, priority gaps, and missing skills. 

7. The roadmap engine uses dependencies to sequence learning tasks and prioritizes the most useful next steps. 

8. Relevant learning resources and practical project templates are attached to roadmap steps. 

9. User marks tasks/projects as started or completed and may update assessment results. 

10. The roadmap adjusts to changed progress or available study time using documented rules. 

11. The dashboard shows progress, readiness signals, and a recommended next action. 

12. When job records are available, the user compares their profile with job requirements and sees matched/missing skills. 

#### **6.1 Core Journey Rule** 

The MVP should demonstrate the central journey end to end using a small, coherent career catalogue and test dataset. A set of disconnected screens is not sufficient. 

### **7. Detailed Product Requirements** 

#### **7.1 User Profile & Assessment** 

Purpose: represent the user's current state and goals, including users with no declared skills or experience. 

|**ID**|**Requirement**|**Priority**|**Acceptance criteria**|
|---|---|---|---|
|UP-01|Users can create/edit a profile with<br>education, field, interests, goals,<br>experience, preferences, and relevant<br>location/work-mode preferences.|P0|Saved profile reopens and edits<br>persist; required fields validate.|
|UP-02|Users can add skills and set<br>proficiency using a documented<br>scale.|P0|Each skill maps to a canonical skill<br>record and defined level.|
|UP-03|The system supports beginners with<br>no declared skills or work experience.|P0|User can proceed without fabricated<br>skills or history.|
|UP-04|The system provides a baseline<br>assessment or structured self-rating<br>for selected skills.|P0|Result stores skill, level/score, date,<br>and method.|
|UP-05|Users can set weekly learning time<br>and preferred learning formats.|P1|Roadmap can use preferences where<br>supported.|
|UP-06|Users can review/correct profile and<br>assessment data.|P0|Changes persist and can refresh<br>dependent results.|



#### **7.2 Career Recommendation** 

Purpose: rank careers using transparent logic, not only a free-form LLM answer. 

|**ID**|**Requirement**|**Priority**|**Acceptance criteria**|
|---|---|---|---|
|CR-01|Maintain a structured career<br>catalogue with skill requirements and<br>target levels.|P0|Career records have IDs,<br>descriptions, requirements, and<br>source/version where available.|
|CR-02|Calculate suitability using<br>documented factors such as<br>interests, education, current skills,<br>preferences, skill gaps, and demand<br>when available.|P0|Scores can be reproduced from saved<br>inputs and documented rules.|
|CR-03|Return ranked career options.|P0|Results sort by score and have a<br>defined tie rule.|
|CR-04|Explain the main reasons for each|P0|Reasons mapto realprofile values,|



CareerOS PRD • Working baseline • Page 5 

||recommendation.||career requirements, or demand data.|
|---|---|---|---|
|CR-05|Let users compare options and select<br>a target career.|P0|Selection feeds gap analysis and<br>roadmap.|
|CR-06|Handle incomplete profiles without<br>false certainty.|P0|System requests missing inputs or<br>communicates reduced confidence.|
|CR-07|Document formula, factors, weights,<br>alternatives, limitations, and<br>evaluation.|P0|Project documentation explains the<br>approach and test method.|



#### **7.3 Skill-Gap Analysis** 

Purpose: compare current skill state with target-career requirements. 

|**ID**|**Requirement**|**Priority**|**Acceptance criteria**|
|---|---|---|---|
|SG-01|Compare current skills with required<br>skills for the selected career.|P0|Output includes required skill, current<br>status/level, and target level.|
|SG-02|Classify skills as strong, developing,<br>priority gap, missing, or not assessed.|P0|Documented thresholds apply<br>consistently; not assessed is not<br>falsely treated as no ability.|
|SG-03|Identify prerequisite gaps that block<br>later skills.|P0|Defined prerequisites are surfaced<br>before dependent tasks.|
|SG-04|Explain why each skill is a gap.|P0|Explanation references target<br>requirement and current<br>profile/assessment.|
|SG-05|Refresh results after relevant profile<br>or assessment changes.|P0|Changed inputs produce updated<br>results.|



#### **7.4 Personalized / Adaptive Roadmap Generator** 

This is the signature feature. It should generate an ordered, achievable plan—not a generic course list. 

|**ID**|**Requirement**|**Priority**|**Acceptance criteria**|
|---|---|---|---|
|RM-01|Generate a roadmap from current skill<br>state and target-career requirements.|P0|Roadmap contains tasks linked to<br>identified gaps.|
|RM-02|Use a skill-dependency graph or<br>equivalent prerequisite structure<br>when ordering tasks.|P0|Prerequisites precede dependent<br>tasks; invalid/cyclic data is detected.|
|RM-03|Prioritize tasks using documented<br>factors such as gap severity,<br>prerequisites, and role relevance.|P0|Order can be explained by rules/data.|
|RM-04|Attach relevant learning resources to<br>skills/tasks.|P1|Mapped resources appear when<br>available; missing mappings are<br>explicit.|
|RM-05|Attach practical project suggestions<br>or milestones where relevant.|P1|Suggestions state objective, skills,<br>difficulty, and deliverable.|
|RM-06|Allow task status updates: not<br>started, in progress, completed.|P0|Status persists and updates<br>dashboard progress.|
|RM-07|Adapt plan when user changes study<br>time or records new<br>progress/assessment.|P1|Documented rules adjust the plan<br>and explain changes.|
|RM-08|Handle missing<br>prerequisites/incomplete career data<br>without silently inventing a valid<br>sequence.|P0|Flag insufficient data or use a clearly<br>labelled fallback.|
|RM-09|Estimate workload when reliable task-<br>duration data exists.|P2|Estimates are labelled estimates, not<br>guarantees.|



#### **7.5 Career Readiness Dashboard** 

Purpose: make progress visible and answer “what should I do next?” 

|**ID**|**Requirement**|**Priority**|**Acceptance criteria**|
|---|---|---|---|
|DB-01|Summarize selected career and<br>current development progress.|P0|Target career and progress are visible<br>when data exists.|
|DB-02|Show roadmap progress and<br>incomplete priority tasks.|P0|Indicators match saved task states.|
|DB-03|Recommend a next action based on<br>priority gaps/prerequisites.|P0|Action follows roadmap logic, not<br>arbitrary text.|
|DB-04|Summarize skill readiness and project<br>evidence.|P1|Indicators link to underlying records.|
|DB-05|Include resume/GitHub/job indicators|P2|Unavailable modules are not shown|



CareerOS PRD • Working baseline • Page 6 

only when those analyses exist. 

as completed. 

#### **7.6 Job-Market Intelligence** 

Use a controlled public dataset first; live large-scale crawling is not an MVP dependency. 

|**ID**|**Requirement**|**Priority**|**Acceptance criteria**|
|---|---|---|---|
|JM-01|Ingest a selected public/permitted<br>job-posting dataset.|P1|Source, date, licence/terms where<br>known, and fields are documented.|
|JM-02|Clean/normalize job titles, skills,<br>locations, and selected fields.|P1|Cleaning steps are reproducible.|
|JM-03|Handle duplicate and incomplete<br>records.|P1|Rules are documented and tested.|
|JM-04|Summarize demand by<br>role/skill/location/time where data<br>supports it.|P1|Summaries state dataset scope and<br>period.|
|JM-05|Separate dataset evidence from<br>general guidance.|P1|Static data is not described as live<br>coverage.|
|JM-06|Add permitted APIs or limited<br>collection later if justified.|P2|Respect source permissions and<br>terms.|



#### **7.7 Skill Extraction and Normalization** 

First version uses a skill taxonomy plus text matching/normalization; do not claim a trained NLP model unless one is actually trained. 

|**ID**|**Requirement**|**Priority**|**Acceptance criteria**|
|---|---|---|---|
|SE-01|Maintain canonical skill names and<br>aliases.|P1|Known aliases map to the same<br>canonical ID.|
|SE-02|Identify skill mentions in selected job<br>text using documented matching<br>rules.|P1|A test sample records expected<br>extraction and observed errors.|
|SE-03|Allow review/correction of extracted<br>skills when user text is analyzed.|P2|Corrections can be applied before<br>downstream use.|
|SE-04|Document ambiguity, context, and<br>missing-taxonomy limitations.|P1|UI/docs avoid implying perfect<br>extraction.|



#### **7.8 Learning Resources** 

Curated resources mapped to skills and proficiency levels. 

|**ID**|**Requirement**|**Priority**|**Acceptance criteria**|
|---|---|---|---|
|LR-01|Maintain resources with title,<br>provider/type, URL, skill mapping, and<br>level.|P1|Resource metadata is stored and<br>filterable where implemented.|
|LR-02|Support categories such as videos,<br>courses, official docs, tutorials,<br>books, articles, coding platforms,<br>exercises, labs, and certifications.|P1|Resource types are categorized.|
|LR-03|Roadmap tasks retrieve resources<br>through explicit skill mappings.|P1|Resources are relevant to the<br>associated skill/task.|
|LR-04|Flag unavailable/unverified links if link<br>checking is implemented.|P2|No unsupported availability claim.|



#### **7.9 Five-Year Career / Skill Trend Estimation** 

Show cautious, data-grounded trend signals—not guaranteed future outcomes. 

|**ID**|**Requirement**|**Priority**|**Acceptance criteria**|
|---|---|---|---|
|FT-01|Calculate historical posting counts or<br>demand indicators over available<br>periods.|P1|Time range and coverage are visible.|
|FT-02|Classify trends as<br>growing/stable/declining only with<br>sufficient observations and<br>documented thresholds.|P1/P2|Insufficient evidence produces a clear<br>insufficient-data state.|
|FT-03|Use a forward forecasting method<br>only if temporal coverage is adequate.|P2|Method, validation and uncertainty<br>are documented.|
|FT-04|Do notpresent estimates as|P1|UI labels results as estimates and|



CareerOS PRD • Working baseline • Page 7 

<mark>guaranteed job outcomes.</mark> 

<mark>shows limitations.</mark> 

#### **7.10 Internship / Job Matching** 

Compare user skills with job-posting requirements. 

|**ID**|**Requirement**|**Priority**|**Acceptance criteria**|
|---|---|---|---|
|JB-01|Compare user skills with<br>requirements in available job records.|P1|Match uses a defined comparison<br>method.|
|JB-02|Show match score/category and<br>matched/missing skills.|P1|Output agrees with source job record<br>and user profile.|
|JB-03|Reuse canonical skill normalization<br>and gap logic where possible.|P1|Known aliases are handled<br>consistently.|
|JB-04|State that a match is guidance, not a<br>hiring guarantee.|P1|No promise of interview or<br>employment.|



#### **7.11 Project Builder** 

Initial version is template-based and semi-functional; advanced AI generation is future scope. 

|**ID**|**Requirement**|**Priority**|**Acceptance criteria**|
|---|---|---|---|
|PB-01|Maintain project templates mapped<br>to careers and skills.|P2|Template has objective, skills,<br>technology, difficulty, duration<br>estimate, and deliverables.|
|PB-02|Recommend projects that practice<br>priority gaps.|P2|Recommendations link to gap-<br>analysis skills.|
|PB-03|Track milestones/status where<br>implemented.|P2|Progress persists and may feed the<br>dashboard.|



#### **7.12 Resume Intelligence** 

Basic resume text/skill comparison, not a full ATS; never invent experience. 

|**ID**|**Requirement**|**Priority**|**Acceptance criteria**|
|---|---|---|---|
|RS-01|Accept supported resume text or file<br>formats if implemented.|P2|Supported formats and limits are<br>stated.|
|RS-02|Identify relevant skills and compare<br>with a target career/job description.|P2|Findings show evidence where<br>possible.|
|RS-03|Suggest improvements without<br>fabricating achievements or work<br>history.|P2|Suggestions ask user to add truthful<br>evidence.|
|RS-04|Explain that results are limited and<br>not an official ATS score.|P2|No pass-rate guarantee.|



#### **7.13 GitHub Analysis** 

Begin with architecture/UI; real authorized API analysis is conditional on time. 

|**ID**|**Requirement**|**Priority**|**Acceptance criteria**|
|---|---|---|---|
|GH-01|If implemented, analyze<br>authorized/public repository<br>information using permitted access.|P2|User understands what data is<br>accessed.|
|GH-02|Potential signals include languages,<br>README, documentation,<br>organization, project diversity,<br>activity, and deployment evidence<br>when available.|P2|Signals link to observable repository<br>data.|
|GH-03|Do not equate commit count with skill<br>or claim repository data proves<br>competence.|P2|UI explains limitations.|



#### **7.14 LinkedIn Improvement** 

Guidance/checklist only unless a supported, authorized integration is available. 

|**ID**|**Requirement**|**Priority**|**Acceptance criteria**|
|---|---|---|---|
|LI-01|Provide a checklist for headline,<br>summary,skills,experience, projects,|P2|Suggestions are user-reviewable.|
||CareerOS PRD • Work|ing baseline • Page8||



||and links.|||
|---|---|---|---|
|LI-02|Do not scrape private data or bypass<br>platform restrictions.|P2|No unauthorized collection.|
|LI-03|Do not automatically change the<br>user's profile.|P2|User remains responsible for edits.|



### **8. Functional Requirements Summary** 

|**ID range**|**Area**|**Primary output**|
|---|---|---|
|UP|Profile/assessment|Structured user state and skill assessment.|
|CR|Career recommendation|Ranked careers with explainable factors.|
|SG|Skill-gap analysis|Current-versus-required skill comparison.|
|RM|Roadmap|Ordered tasks, dependencies,<br>resources/projects, progress.|
|DB|Dashboard|Progress, readiness signals, next action.|
|JM|Job-market intelligence|Cleaned dataset and demand summaries.|
|SE|Skill extraction|Normalized skills from supported text.|
|LR|Learning resources|Skill-mapped catalogue.|
|FT|Trend estimation|Historical summaries and cautious estimates.|
|JB|Job matching|Match score/category and matched/missing<br>skills.|
|PB/RS/GH/LI|Supporting features|Project, resume, GitHub, LinkedIn capabilities if<br>feasible.|



### **9. Product Logic and Recommendation Rules** 

#### **9.1 Explainable Career Scoring** 

Version 1 should use a documented scoring or similarity method. Candidate factors include interest alignment, education alignment, current skill alignment, preferences, gap size, and market demand when available. Define each factor, source, normalization, and weight. Missing data must be handled consistently and may reduce confidence. Scores are indicators, not objective truths. 

#### **9.2 Skill-Gap Classification** 

Compare a user's recorded skill level with the target role's required level. Define a proficiency scale and thresholds for strong, developing, priority gap, missing, and not assessed. 'Not assessed' must not automatically mean the user has no ability. 

#### **9.3 Dependency-Aware Roadmap** 

Represent prerequisite relationships between skills/tasks. Order prerequisites before dependent tasks using a graph-ordering approach when the graph is valid. Detect cycles and unresolved dependencies. Prioritize using documented rules such as gap severity, prerequisite importance, role relevance, and available study time. Explain the resulting order. 

#### **9.4 Trend Estimates** 

Start with descriptive historical analysis, such as posting counts and growth rates. Consider forecasting only when the dataset has adequate time coverage and the method can be evaluated with time-based validation. If evidence is insufficient, report that rather than forcing a prediction. 

### **10. Data Requirements** 

#### **10.1 Main Data Entities** 

|**Entity**|**Purpose / representative fields**|
|---|---|
|User|ID, account data, preferences, consent settings.|
|UserProfile|Education, interests, goals, experience, preferences, weekly learning time.|



CareerOS PRD • Working baseline • Page 9 

|Skill|Canonical ID, name, category, aliases, description.|
|---|---|
|UserSkill|User ID, skill ID, level/assessment state, source, last updated.|
|Career|ID, title, description, role family, source/version.<br>i|
|CareerSkillRequirement|Career ID, skill ID, target proficiency, importance, source.|
|CareerRecommendation|User, career, score, component scores, explanation, timestamp/model version.|
|JobPosting|Source, title, company if available, location, salary if published, skills,<br>experience, work mode, date, description.<br>i|
|LearningResource|Title, provider, URL, type, skill mapping, level, verification metadata.|
|SkillDependency|Prerequisite and dependent skill/task IDs, relationship/source.|
|Roadmap|User, target career, version, timestamps, plan settings.<br>f|
|RoadmapTask|Roadmap, skill/task, order, priority, resources/projects, status, effort estimate if<br>available.<br>f|
|ProjectTemplate|Objective, skills, technology, difficulty, duration estimate, milestones,<br>deliverables.|
|JobMatch|User, job, score/category, matched skills, missing skills, calculation version.<br>i|
|AssessmentResult|User, skill/assessment, result, date, method, source/confidence.|



#### **10.2 Data Quality Rules** 

- Use canonical IDs for skills and careers; store aliases separately. 

- Record dataset source, date, licence/terms where known, and transformations. 

- Normalize skills and role titles consistently. 

- Document handling for duplicates, missing fields, outdated records, and conflicting labels. 

- Separate user-entered, system-inferred, and dataset-derived information. 

- Never invent salary data or represent imputed values as observed facts. 

- Version career requirements, scoring logic, and roadmaps where practical. 

#### **10.3 Data Sources** 

Prefer a controlled public dataset, curated career/skill records, and manually reviewed resource mappings for the MVP. Check licensing, terms, permissions, and attribution before using third-party data. Live scraping is not required. 

### **11. Non-Functional Requirements** 

|**ID**|**Category**|**Requirement**|
|---|---|---|
|NFR-01|Usability|Use clear language, visible progress, consistent<br>navigation, and actionable error messages.|
|NFR-02|Accessibility|Use readable contrast, semantic structure,<br>keyboard-operable controls, labels, and<br>responsive layouts where practical.|
|NFR-03|Performance|Measure common workflows and optimize<br>bottlenecks; set numeric targets after profiling<br>the prototype.|
|NFR-04|Reliability|Handle missing data, invalid inputs, and failed<br>external calls gracefully.|
|NFR-05|Security|Protect authenticated routes, validate inputs,<br>keep secrets out of source control, and use<br>established auth practices.|
|NFR-06|Privacy|Collect only necessary data and allow users to<br>review/correct their profile.|
|NFR-07|Transparency|Show reasons, data coverage, and limitations for<br>recommendations, matches, and trends.|
|NFR-08|Maintainability|Use modular code, documented APIs,<br>meaningful names, version control, and core<br>tests.|
|NFR-09|Portability|Support modern desktop and mobile browsers<br>at selected viewport sizes.|
|NFR-10|Scalability|Keep modules/data access clean without adding<br>unnecessary infrastructure early.|
|NFR-11|Auditability|Retain enough calculation metadata to<br>reproduce key outputs during testing.|
|NFR-12|Ethical use|Avoid discriminatory assumptions, deterministic<br>career labels, and unsupported accuracy<br>claims.|



CareerOS PRD • Working baseline • Page 10 

### **12. UX and Interface Requirements** 

|**Screen**|**Purpose**|**MVP requirement**|
|---|---|---|
|Welcome/Landing|Explain product and begin journey.|Clear value proposition and primary action.|
|Sign up/Login<br>i|User access if auth is in scope.|Validation and clear failure states.|
|Profile/Assessment|Collect current state and goals.|Skill inputs, assessment state, edit capability.|
|Career Discovery|Show ranked suggestions.|Score/category, reasons, compare/select<br>action.|
|Career Detail|Explain chosen role.|Summary, required skills, data source/coverage<br>where available.|
|Skill-Gap View|Show current versus required skills.|Categories, target levels, reasons, priority.|
|Roadmap|Present ordered development plan.|Tasks, prerequisites/order, resource/project<br>links, status.|
|Dashboard|Summarize progress.|Progress, selected goal, priority gap, next action.|
|Job Match|Compare with job record.|Score/category, matched/missing skills, job<br>context.<br>i|
|Settings/Privacy|Manage profile and preferences.|Edit profile and relevant consent controls where<br>implemented.|



#### **12.1 UX Rules** 

- Use beginner-friendly language and explain technical terms. 

- Do not overwhelm onboarding with every advanced module. 

- Provide empty states for no skills, no target career, or no job records. 

- Distinguish not assessed, absent from profile, and assessed below target. 

- Show loading, success, and error states for slow or external actions. 

- Allow users to inspect the evidence behind important recommendations. 

### **13. Technical Direction and Architecture** 

This is the preferred direction discussed so far. It is subject to technical validation; not every component must be deployed in the earliest prototype. 

|**Layer**|**Preferred technology**|**Responsibility**|
|---|---|---|
|Frontend|Next.js / React, Tailwind CSS|Responsive UI, forms, dashboard and<br>visualizations.|
|Backend API|Node.js, Express.js, REST APIs|Application rules, validation, data access,<br>orchestration.|
|Database|PostgreSQL; pgvector only if justified|Profiles, careers, skills, jobs, resources,<br>roadmaps, assessments, matches.|
|AI/data services|Python; FastAPI if a separate service is justified|Data processing, recommendation experiments,<br>NLP, trend analysis, optional ML/LLM.|
|Data processing|Python libraries such as Pandas|Cleaning, normalization, repeatable analysis<br>pipelines.|
|Authentication|Established auth patterns; JWT/OAuth where<br>appropriate|User access and authorized integrations.|
|Version control|Git and GitHub|Code history, issues, portfolio.|
|Packaging/deployment|Docker and suitable cloud host later|Reproducible environment and deployment.|
|Optional infrastructure|Redis only if justified|Caching/background work if measured need<br>emerges.|



#### **13.1 High-Level Architecture** 

Proposed flow: Next.js/React frontend → Node.js/Express REST API → PostgreSQL. Python/FastAPI data or AI services may support skill extraction, recommendation experiments, analytics, and trend estimation. Keep the architecture simple enough for one beginner developer to build, debug, deploy, and explain. 

#### **13.2 Architecture Principles** 

- Start with a modular monolith or similarly simple deployment unless separation has a clear benefit. 

- Keep recommendation and roadmap logic independently testable from the UI. 

- Define request/response contracts between frontend, backend, and Python services. 

CareerOS PRD • Working baseline • Page 11 

- Do not add vector databases, Redis, microservices, or model-serving infrastructure only to appear advanced. 

- Store secrets outside committed code and document local setup. 

### **14. AI/ML and Explainability Policy** 

|**Capability**|**Initial honest description**|**Possible later extension**|
|---|---|---|
|Career recommendation|Explainable weighted scoring/similarity on<br>structured profile/career data.|Evaluate learned ranking only if suitable labelled<br>data exists.|
|Skill extraction|Taxonomy-based matching and normalization.|Evaluate NLP entity extraction or embeddings on<br>labelled examples.|
|Skill-gap analysis|Deterministic comparison of current and target<br>proficiency.|Improve calibration/evidence capture; not<br>inherently an ML problem.|
|Roadmap|Rules + dependency graph + prioritization.|Adapt sequencing using outcome data if enough<br>reliable observations exist.|
|Job matching|Skill normalization and transparent<br>similarity/scoring.|Compare lexical, TF-IDF, embedding, or learned<br>ranking on test data.|
|Trends|Historical descriptive statistics first.|Forecast only with enough temporal data and<br>backtesting.|
|LLM use|Optional language assistance/summarization with<br>user review.|Add only when it measurably helps and does not<br>replace core logic.|



#### **14.1 For Every AI/ML Component, Document** 

- Inputs and data source. 

- Preprocessing and normalization. 

- Algorithm/model and reason for choosing it. 

- Output and how the UI uses it. 

- Evaluation method and test cases. 

- Limitations, bias risks, and failure cases. 

- Baseline or alternative considered where practical. 

#### **14.2 Evaluation Approach** 

Create representative test profiles and job records. Inspect whether outputs are sensible. Use ranking/classification metrics only when suitable labelled ground truth exists. For skill extraction, manually label a sample and measure errors if feasible. For forecasting, use time-based validation and do not evaluate on data used to fit the forecast. 

### **15. Privacy, Security, and Responsible Behavior** 

- Collect only data needed for the career-development workflow. 

- Do not expose one user's profile, assessment, roadmap, or resume to another user. 

- Use authorized access for GitHub and other integrations; explain what is accessed. 

- Do not scrape private LinkedIn data or bypass platform controls. 

- Let users review/correct inferred skills before they influence important outputs where practical. 

- Never fabricate credentials, skills, work history, or project outcomes. 

- Do not claim recommendations determine aptitude or future success. 

- Do not guarantee hiring, salary, or future market conditions. 

- Document retention/deletion and external AI service data handling before processing real personal data. 

- Use synthetic/demo profiles in early development. 

### **16. Semester Plan and Delivery Strategy** 

#### **16.1 Semester 7 — Analysis and Foundation** 

|**Workstream**|**Expected output**|
|---|---|
|Problem identification|Problem statement, target segment, user needs and assumptions.|
|Literature survey|Reviewed research on career recommendation, job matching,skillgaps,|



CareerOS PRD • Working baseline • Page 12 

||learning paths.|
|---|---|
|Objectives and scope|Goals, non-goals, MVP priorities and evaluation plan.|
|Requirements|PRD baseline followed by an SRS with testable requirements.|
|Workplan|Milestones, owners if applicable, risks and progress tracking.|
|Technology selection|Stack rationale, alternatives, feasibility and learning dependencies.|
|System design|Use cases, architecture, data model, API outline, DFD/UML as required.|
|UX/UI|Wireframes/prototype for core journey.|
|Data and algorithms|Dataset choice, taxonomy, scoring and roadmap logic.|
|Initial implementation|A small vertical slice if schedule allows.|
|Phase 1 closure|Documentation, presentation, prototype evidence, gaps and Semester 8<br>plan.|



#### **16.2 Semester 8 — Implementation and Evaluation** 

- Complete the P0 journey: profile → recommendation → skill gap → roadmap → dashboard. 

- Implement and validate career/skill data and job dataset pipeline. 

- Add learning resources and job matching where feasible. 

- Implement skill extraction and trend summaries only to the depth supported by data/time. 

- Add optional project/resume/GitHub/LinkedIn features selectively after core stability. 

- Test functionality, edge cases, security basics, usability, and output quality. 

- Deploy a working version, prepare final report, and demonstrate representative profiles. 

- Document limitations and future work honestly. 

#### **16.3 Solo-Developer Constraint** 

Assume the developer starts with little or no coding experience. Learn and build in parallel: learn a concept, make a small exercise, apply it to CareerOS, test it, then continue. Do not postpone all implementation until every technology is mastered. 

#### **16.4 Recommended Build Order** 

13. Developer basics, VS Code, files/folders, terminal, debugging, Git/GitHub. 

14. HTML/CSS and JavaScript fundamentals. 

15. React/Next.js and responsive UI. 

16. HTTP/REST, Express, backend validation. 

17. PostgreSQL and SQL data modelling. 

18. Authentication and basic security. 

19. Python fundamentals, CSV/JSON, Pandas and data cleaning. 

20. Career/skill taxonomy and deterministic scoring. 

21. Skill-gap analysis and dependency-aware roadmap engine. 

22. Resource mapping, progress tracking and dashboard integration. 

23. Job dataset cleaning, matching, and descriptive trend analysis. 

24. Optional NLP/ML/LLM, evaluation, deployment and polish. 

### **17. Testing and Acceptance** 

#### **17.1 Core End-to-End Acceptance Scenario** 

Given a completed user profile and a target career with defined skill requirements/dependencies, CareerOS can: (1) show explainable career recommendations; (2) let the user select a career; (3) compare current and required skills; (4) identify and explain gaps; (5) produce a roadmap respecting defined prerequisites; (6) attach mapped resources where available; (7) let the user update task status; and (8) update dashboard progress and next action. 

#### **17.2 Test Categories** 

- Functional tests for all P0 requirements. 

- Validation tests for missing, malformed, and contradictory inputs. 

- Edge cases: no skills, incomplete career data, unavailable resources, aliases, cyclic dependencies. 

- Fixed-input tests for career scores, gap classifications, and roadmap order. 

CareerOS PRD • Working baseline • Page 13 

- 

- 

- 

- 

- Data pipeline tests for normalization, duplicate handling, missing fields, and reproducibility. 

- Permission tests to ensure users cannot access others' data. 

- Responsive UI and usability checks at representative screen sizes. 

- Manual review to ensure explanations are supported by stored data or rules. 

### **18. Risks, Assumptions, and Dependencies** 

|**Type**|**Item**|**Handling**|
|---|---|---|
|Risk|Scope too large for one beginner developer.|Protect P0; make P2/future features optional; build<br>a vertical slice early.|
|Risk|Job data is sparse, old, or inconsistent.|Use controlled data; document coverage; clean and<br>validate.|
|Risk|Career/skill requirements are subjective or<br>incomplete.|Record sources/version; manually review a small<br>set; show limitations.|
|Risk|Recommendations are hard to explain/evaluate.|Use transparent scoring; record factor<br>contributions; create test profiles.<br>i|
|Risk|Roadmap order is incorrect.|Define prerequisite relationships; test ordering;<br>detect cycles/missing dependencies.|
|Risk|APIs/platform integrations unavailable.|Keep integrations optional; support curated<br>data/demo mode.|
|Risk|LLM cost or privacy concerns.|Make LLM optional; limit use; minimize personal<br>data sent.|
|Assumption|A small career catalogue can be curated for the<br>MVP.|Start narrow and expand after core works.|
|Assumption|A suitable public dataset can be used within its<br>terms.|Verify source and licence before committing.|
|Dependency|Core programming/database skills precede<br>advanced modules.|Follow the phased build order.|



### **19. Open Decisions to Finalize** 

These remain decisions for analysis; this PRD does not silently assume answers. 

- Which initial career families and roles will the MVP support? 

- Which public job dataset will be used, and what are its licence, fields, and time coverage? 

- What proficiency scale and written definitions will be used? 

- What exact scoring factors, normalization rules, and weights will version 1 use? 

- What source will seed skill prerequisites, and how will it be reviewed? 

- Will accounts be included in the first demo or will a demo mode come first? 

- Which resources will be curated manually, and how will links be checked? 

- What realistic numeric targets will be set after baseline tests? 

- Which optional features can be delivered without threatening the core MVP? 

### **20. Product Roadmap** 

|**Phase**|**Focus**|**Exit condition**|
|---|---|---|
|A — Define|Validate problem, users, MVP and dataset<br>feasibility.|PRD reviewed; open decisions prioritized.|
|B — Specify|SRS, use cases, acceptance criteria, data<br>model, architecture, wireframes.|Core requirements and design are testable.|
|C — Vertical slice|Profile, small career catalogue, scoring, results.|Test profile receives reasoned career<br>recommendation.|
|D — Core journey|Gap analysis, dependency graph, roadmap,<br>progress, dashboard.|End-to-end core acceptance tests pass.|
|E — Context/resources|Curated resources, job dataset, job matching,<br>demand views.|Outputs trace to data and show limitations.|
|F — Extensions|Selective project/resume/GitHub/LinkedIn and<br>trend estimation.|Extensions do not destabilize P0.|
|G — Delivery|Testing, usability evaluation, deployment, report<br>and demo.|Working demo, evidence, documentation and<br>known limitations.|



CareerOS PRD • Working baseline • Page 14 

### **21. Definition of MVP Done** 

- Users can enter, save, and edit a profile with skills and goals. 

- The system ranks a limited career catalogue using a documented, reproducible scoring method. 

- Each recommendation includes data-backed explanations. 

- Users can select a career and view current-versus-required skill gaps. 

- The roadmap orders defined prerequisites correctly and identifies priority tasks. 

- Relevant resources are linked where curated mappings exist. 

- Users can update task progress and see dashboard changes. 

- The system handles incomplete data and errors without fabricating facts. 

- Core logic has automated or repeatable documented tests. 

- Data provenance, algorithm design, evaluation, privacy, limitations, and future work are documented. 

- The application can be demonstrated end to end using representative sample profiles. 

### **22. Glossary** 

|**Term**|**Plain-language meaning**|
|---|---|
|PRD|Product Requirements Document: why the product exists, who it serves,<br>what it should deliver, and how success is judged.|
|SRS|Software Requirements Specification: detailed, testable statements of<br>what software must do and its constraints.|
|Career taxonomy|Structured list of career roles and their attributes/relationships.|
|Skill taxonomy|Consistent catalogue of skill names, categories, and aliases.|
|Skill gap|Difference between a user's current skill state and target role<br>requirements.|
|Dependency graph|Representation of prerequisites showing what should be learned first.|
|Explainable scoring|A score whose contributing factors and rules can be inspected.|
|NLP|Natural Language Processing: methods for working with human-language<br>text.|
|LLM|Large Language Model: AI model that generates or transforms text.|
|MVP|Minimum Viable Product: smallest useful version that validates core<br>product value.|
|Acceptance criteria|Conditions that must be met for a requirement to be considered<br>implemented correctly.|



### **23. Research Basis** 

The following studies were discussed during CareerOS planning. They inform the product direction but do not prove productmarket fit or guarantee CareerOS will reproduce their reported results. Verify full bibliographic details from the original papers before final academic submission. 

- Seesukong, S., Angskun, T., Keandoungchun, N., Thippongtorn, A., & Angskun, J. (2024). “CARIA: A Personalized Career Recommender Based on Individual Competency Similarity Measure.” International Journal of Information and Communication Technology Education. 

- Xu, X., & Gao, H. (2026). “A knowledge graph-integrated recommendation method for college student career planning.” Discover Artificial Intelligence. https://link.springer.com/article/10.1007/s44163-026-00996-9 

- Alsaif, S. A., Hidri, M. S., Eleraky, H. A., Ferjani, I., & Amami, R. (2022). “Learning-Based Matched Representation System for Job Recommendation.” Computers, 11(11), 161. https://www.mdpi.com/2073-431X/11/11/161 

- Wulandari, C., Astutik, P., Soegito, R. C., Dharmawan, Y. S., Munawaroh, H., & Bariyah, T. (2024). “Hybrid MCDM Career Recommendation System for Information System Student Using AHP, VIKOR and Weighted Euclidean Distance.” Procedia Computer Science, 234, 364–372. https://doi.org/10.1016/j.procs.2024.03.016 

- Ma et al. (2023), personalized learning-path recommendation paper discussed in the literature review. Verify exact title, authors, venue, and DOI from the original source before formal citation. 

CareerOS PRD • Working baseline • Page 15 

### **24. Final Product Definition** 

CareerOS is an explainable career-development system that connects career discovery to skill-gap analysis, a dependency-aware learning roadmap, practical resources/projects, and progress tracking. Its initial value comes from integrating these capabilities around a transparent, testable core—not from claiming every feature is fully automated or powered by advanced AI. 

The implementation should prioritize the P0 journey, use curated and traceable data, keep optional modules small, and make important recommendations explainable. Career Polaris remains the intended future startup/brand direction; CareerOS is the current product/project name. 

CareerOS PRD • Working baseline • Page 16 

