# Workspace Agent Instructions

This is an existing application. Preserve it.

## Mandatory operating contract

1. Separate inspection from implementation. Inspection is read-only. Implementation requires explicit user approval of a written plan.
2. Never overwrite, delete, rename, move, regenerate, or broadly refactor existing files unless that exact change is approved.
3. Do not install, remove, or update dependencies, change package versions, edit environment files, alter build configuration, or run mutating generators without explicit approval.
4. Never discard, reset, stash, commit, or push user changes unless explicitly requested.
5. Treat the current Git working tree as user-owned. Inspect `git status` before planning and again before implementation.
6. Do not invent files, exports, routes, API endpoints, schemas, response fields, business rules, component props, or successful test results.
7. Verify framework and library APIs using the installed package, TypeScript declarations, and version-matched official documentation.
8. For HeroUI work, target the installed HeroUI v2.2.20 setup only when that exact version is confirmed. Do not silently migrate to HeroUI v3.
9. Reuse existing architecture, components, hooks, providers, API clients, validation, state management, and design tokens.
10. If a requested change requires work outside the approved scope, stop and ask for approval.
11. Maintain font size and color integrity across all UI implementations by using previous colors, typography scales, and established design tokens from the project.
12. Place new components in their designated domain folder under `src/components/` (or `src/modules/`) and export them via barrel files; do not create component files directly inside `src/app/` routes.

## Inspection phase

During inspection, do not modify project files or data. Do not install dependencies, run formatters with write mode, run code generators, or execute commands that mutate the repository.

Return:
- verified project facts and versions;
- relevant architecture and existing implementation;
- exact proposed files to create or modify;
- purpose and scope of each change;
- existing functionality to preserve;
- verified APIs and references;
- assumptions, unknowns, and risks;
- a verification plan.

Then stop. Do not transition into implementation automatically.

## Implementation phase

Only begin after the user explicitly approves the written plan. Recheck Git status and confirm the plan remains safe. Modify only approved files and functionality. If the scope must change, stop and request approval.

## Packages
Check the package for heroui and make sure it matches and will function well

## Typography and colors integrity
Maintain font size and color integrity across all UI implementations by using previous colors, typography scales, and established design tokens from the project. Do not introduce arbitrary colors, mismatched font sizes, or unverified styling overrides.

### Mandatory Color Guide & Screenshot-to-Code Rules
When the user provides an image, mockup, or design reference, **DO NOT guess or use presumed AI colors** (such as generic `#596AFE`, `#161925`, `text-gray-900`, `text-gray-600`, etc.). Always map visual elements strictly to the project's verified design tokens:

- **Success Green**: `#10B981` (icons, checkmarks, completed highlights). Completed pills: `bg-[#E8FAF0] text-[#10B981]`.
- **Brand Primary Blue/Indigo**: `#5160E7` (primary CTA buttons, active gauge stroke, active tab indicator, primary links, current stage pills).
- **Brand Current Stage Accent**: `#4F46E5` (stepper current stage icon).
- **Brand Light Tint**: `#F2F4FF` (badge backgrounds, icon containers, stage card background - never use `#EEF0FF` or `#F5F6FF`).
- **Brand Soft Border**: `#EEF0FF` / `#EEF0FF]/80` (borders for `#F2F4FF` callout containers).
- **Neutral Button Border**: `#ECEBF0` (bordered secondary buttons, e.g. "View Details", "Previous Task", "Save Draft").
- **Primary Headings**: `#1D1348` (card headings, section headers, welcome greeting).
- **Secondary Headings & Item Titles**: `#101828` (task card titles, stage titles, current focus item).
- **Strong Content Text**: `#1C1C1E` / `#0F172A` (checklist stage titles, points counter).
- **Body & Descriptions**: `#475467` (descriptions, helper text, reviewer commentary, deliverable copy).
- **Subtitles & Inactive Labels**: `#3A3A3C` (welcome subtitle, "Stay Consistent" footer message, "Overall Completion" label, upcoming checklist items).
- **Secondary Meta & Small Labels**: `#64748B` (small metrics, "points" label, timestamps, file sizes, stage breadcrumbs).
- **Gauge Track Stroke**: `#EBEBF5` (unfilled circular gauge progress track).
- **Warning / Points Tile (Amber)**: `bg-[#FFFBEB] border border-[#FEF3C7]`, icon `bg-[#FEF3C7] text-[#FBBF24] stroke-[#F59E0B]`, text `#0F172A`.
- **Streak Tile (Red / Fire)**: `bg-[#FEF3F2] border border-[#FEE4E2]/70`, icon `bg-[#FEE4E2] text-[#F04438]`.

## Folder structure and component placement rules
Place all new and relatable components within their designated folder under `src/components/` (or `src/modules/` where appropriate). Do not put component files directly inside `src/app/` route folders (`src/app/` is strictly for route definitions like `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`).

### Component Directory Mapping:
- **`src/components/custom/`**: Reusable generic inputs, buttons, and custom controls (`CustomButton`, `CustomInput`, `CustomSelect`, `CustomDatePicker`, `CustomPhoneInput`, `CustomEditor`, `CustomSearch`, etc.). Export via `src/components/custom/index.tsx`.
- **`src/components/ui/`**: Base foundational UI primitives (`Button`, `Card`).
- **`src/components/shared/`**: Generic shared components reused across multiple features (`ModalLayout`, `LoadingLayout`, `Loader`, `ImagePicker`, `FilterDrawer`, `activityLog`, etc.). Export via `src/components/shared/index.tsx`.
- **`src/components/forms/`**: Full domain-specific forms and form modal bodies (`WorkTalentForm`, `SubmitChallengeForm`, `GradeChallenge`, `OrganisationForm`, `UpdateUserInfo`, etc.). Export via `src/components/forms/index.tsx`.
- **`src/components/modal/`**: Standalone global or utility modals (`LoadingUserDetailsModal`, `PhoneNumberRequiredModal`).
- **`src/components/dashboardlayout/`**: Dashboard layout structure components (`sidebar`, `navbar`, `bottomBar`).
- **`src/components/<feature>/`**: Domain/feature-specific components grouped by feature:
  - `src/components/challenges/` — Challenge cards, task lists, detail page components, challenge navbar.
  - `src/components/dashboard/` — Dashboard widgets, user statistics, badges, top users.
  - `src/components/explore/` — Explore navbar, filter components, opportunity cards.
  - `src/components/workexperience/` — Work experience domain components organized into dedicated tab subfolders (`header/`, `tabs/`, `programs/`, `overview/`, `work/`, `standups/`, `messages/`, `performance/`, `team/`, `break/`, `resources/`). Export all subfolders via `src/components/workexperience/index.ts`.
  - `src/components/workexp/` — Work experience sections, practice jobs, track lists, enrollment modals.
  - `src/components/auth/` — Authentication and login/signup components.
  - `src/components/onboarding/` — Onboarding cards and steps.
  - `src/components/communities/` — Community cards and groups.
  - `src/components/landing-page/` & `src/components/main-landing-page/` — Marketing and landing page sections.
- **`src/modules/`**: Independent, self-contained modules with their own state, websockets, and views (`chat-module`, `community-chat`, `payment_wallet_module`, `notifications`).
- **`src/app/`**: Next.js App Router route entry points strictly. Only `page.tsx`, `layout.tsx`, and route boundary files live here. Import components from `@/components/...` or `@/modules/...`.

### Placement Conventions:
1. Re-export new components through the directory's barrel file (`index.tsx` / `index.ts`) where established.
2. Check `src/components/custom/` and `src/components/shared/` first before creating new controls.
3. Keep `"use client"` directives focused on the interactive components, not the whole page route whenever practical.
4. **Tab-Based Feature Isolation**: For features with multi-tab or multi-subpage structures (such as `src/components/workexperience/`), each tab content page must be placed in its own dedicated domain folder (e.g. `overview/`, `work/`, `standups/`, `messages/`, `performance/`, `team/`, `break/`, `resources/`, `programs/`), each with an `index.ts` barrel file. All subfolders must be re-exported via the root feature barrel (`src/components/workexperience/index.ts`). Next.js App Router route files (`src/app/.../page.tsx`) must strictly remain lightweight route wrappers that import and render their respective tab component.

## Final review

Inspect the complete diff. Run only appropriate approved checks. Report files changed, behavior implemented, checks actually run and their results, and unresolved issues. Never claim a check passed unless it was run and passed.
