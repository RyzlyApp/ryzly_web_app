import React, { useState } from "react";

// Ryzly — Coach Guide Component
// Single-file React component that renders a readable, interactive guide for Career Coaches
// Uses Tailwind classes for styling. Default export a React component.

export default function RyzlyCoachGuide() {
    const [activeTab, setActiveTab] = useState("overview");
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

    function toggleSection(key: string) {
        setOpenSections((s: Record<string, boolean>) => ({ ...s, [key]: !s[key] }));
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <header className="mb-6">
                <h1 className="text-3xl font-extrabold">Ryzly — Coach Guide</h1>
                <p className="mt-2 text-gray-600">A practical interactive guide for coaches to create & run challenges on Ryzly.</p>
            </header>

            <section className="grid gap-6 md:grid-cols-3 mb-6">
                <Card title="Quick Actions">
                    <ActionItem label="Switch to Coach Mode" hint="Top-right: Participants / Coach toggle" />
                    <ActionItem label="Create Challenge" hint={`Button: "Create Challenges" — available on Dashboard, Challenge, Achievements, Settings`} />
                    <ActionItem label="Support" hint="support@ryzly.app" />
                </Card>

                <Card title="Statuses">
                    <StatusItem title="Draft" desc="Details set but tasks NOT added. Visible only to you." />
                    <StatusItem title="Pending" desc="Tasks added — awaiting admin approval." />
                    <StatusItem title="Ongoing" desc="Approved and live — participants can join." />
                </Card>

                <Card title="Important Reminder">
                    <p className="text-sm">On the last day, click <strong>End Challenge</strong> to enable certificates and portfolios. Failure to do this may cause reports or bans.</p>
                </Card>
            </section>

            <nav className="mb-6">
                <div className="flex gap-2 border-b">
                    {[
                        ["overview", "Overview"],
                        ["create", "Create & Requirements"],
                        ["tasks", "Tasks"],
                        ["details", "Challenge Details"],
                        ["example", "Example: Mailchimp Challenge"],
                    ].map(([key, label]) => (
                        <button
                            key={key}
                            onClick={() => setActiveTab(key)}
                            className={`py-2 px-3 -mb-px ${activeTab === key ? "border-b-2 border-indigo-600 font-semibold" : "text-gray-600"}`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </nav>

            <main>
                {activeTab === "overview" && (
                    <div className="prose max-w-none">
                        <h2>Landing, Login & Profile</h2>
                        <p>
                            Landing page: "Sign in" for returning users and "Login" for new users.
                            New users should <strong>Sign up</strong> with email. Returning users click "Sign in" and use a magic code sent to their inbox.
                        </p>
                        <h3>Profile</h3>
                        <p>Click <em>Settings</em> to update profile fields (username, skills, etc.).</p>
                    </div>
                )}

                {activeTab === "create" && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">Upgrading to Coach Mode & Creating a Challenge</h2>
                        <p>Use the <strong>Create Challenges</strong> button (top-right). A dropdown will prompt for challenge details. All required fields must be filled for admin review.</p>

                        <h3 className="mt-4">Fields & Requirements</h3>
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b"><th className="py-2">Field</th><th className="py-2">Description</th></tr>
                            </thead>
                            <tbody>
                                <tr className="border-b"><td className="py-2">Image</td><td className="py-2">Insert a relevant image for your challenge.</td></tr>
                                <tr className="border-b"><td className="py-2">Description</td><td className="py-2">Detailed overview of the challenge.</td></tr>
                                <tr className="border-b"><td className="py-2">Winning Prize</td><td className="py-2">Reward for winners.</td></tr>
                                <tr className="border-b"><td className="py-2">Level</td><td className="py-2">Newbie, Beginner, Mid-level, or Advanced.</td></tr>
                                <tr className="border-b"><td className="py-2">Industry</td><td className="py-2">Tech, EdTech, AgriTech, HealthTech, FinTech, Business.</td></tr>
                                <tr className="border-b"><td className="py-2">Tracks</td><td className="py-2">Product Management, Cybersecurity, Digital Marketing, Data Analyst, Software Engineering.</td></tr>
                                <tr className="border-b"><td className="py-2">Tags</td><td className="py-2">Example: figma, python, c++ — add for searchability.</td></tr>
                                <tr className="border-b"><td className="py-2">Participation Fee</td><td className="py-2">Cost to join.</td></tr>
                                <tr className="border-b"><td className="py-2">Start & End Date</td><td className="py-2">Define challenge duration.</td></tr>
                            </tbody>
                        </table>

                        <div className="mt-4">
                            <h4 className="font-semibold">Coach Mode</h4>
                            <p>After approval, toggle Participant/Coach at the top-right to access coach features: drafts, pending, ongoing.</p>
                        </div>
                    </div>
                )}

                {activeTab === "tasks" && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">Adding & Managing Tasks</h2>
                        <p>Open your Draft challenge → Click it → Use the "Add Task" icon. Fill in title, description, start & end date. Optionally attach image, video or link as guidance.</p>

                        <div className="bg-yellow-50 p-4 rounded">
                            <strong>Tip:</strong> Only add the number of tasks you can realistically grade in the timeframe. You can extend task deadlines if you need more grading time.
                        </div>

                        <div>
                            <h3 className="font-semibold">Task Fields</h3>
                            <ul className="list-disc list-inside">
                                <li>Title</li>
                                <li>Description / Instructions</li>
                                <li>Start & End Date</li>
                                <li>Attachment: image, video, link</li>
                            </ul>
                        </div>
                    </div>
                )}

                {activeTab === "details" && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">Challenge Details Page</h2>
                        <p>The central hub with tabs for Overview, Resources, Tasks, Leaderboard, Coaches, Reviews, Participants, and Live Chat.</p>

                        <div className="grid md:grid-cols-2 gap-4">
                            <InfoCard title="Overview & Coach Description">Sets the stage and coach bio.</InfoCard>
                            <InfoCard title="Progress Tracker">Shows day-based progress (e.g. 0/10 days).</InfoCard>
                            <InfoCard title="Resources">Add links, docs, or files to help participants.</InfoCard>
                            <InfoCard title="Live Chat">Real-time interaction, announcements, images & videos.</InfoCard>
                        </div>
                    </div>
                )}

                {activeTab === "example" && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold">Example Challenge: Mailchimp + Copywriting</h2>
                        <p className="text-gray-700">Track: Digital Marketing • Industry: EdTech</p>

                        <ChallengeExample />

                        <div className="mt-4 p-4 border rounded">
                            <h4 className="font-semibold">Portfolio & Visuals</h4>
                            <p>Encourage talents to create high-quality visuals for their portfolio entries (screenshots, workflow images, mockups). Use tools like Figma or Canva and export clean PNGs or JPEGs. Good visuals increase portfolio attractiveness.</p>
                            <button className="mt-3 inline-block px-4 py-2 rounded bg-indigo-600 text-white">Visual Tips & Export Checklist</button>
                        </div>
                    </div>
                )}
            </main>

            <footer className="mt-8 text-sm text-gray-500">Need changes? Edit this component to fit your brand styles or content.</footer>
        </div>
    );
}

function Card({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="p-4 border rounded bg-white shadow-sm">
            <h3 className="font-semibold mb-2">{title}</h3>
            <div className="text-sm text-gray-700">{children}</div>
        </div>
    );
}

function ActionItem({ label, hint }: { label: string, hint: string }) {
    return (
        <div className="py-2">
            <div className="font-medium">{label}</div>
            <div className="text-xs text-gray-500">{hint}</div>
        </div>
    );
}

function StatusItem({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="py-2">
            <div className="font-semibold">{title}</div>
            <div className="text-sm text-gray-600">{desc}</div>
        </div>
    );
}

function InfoCard({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="p-3 border rounded bg-gray-50">
            <div className="font-semibold">{title}</div>
            <div className="text-sm mt-1">{children}</div>
        </div>
    );
}

function ChallengeExample() {
    return (
        <div className="p-4 border rounded bg-white">
            <h3 className="font-semibold">Boost Course Completion — Mailchimp Workflow</h3>
            <p className="text-sm text-gray-600">Outcome: build an automated email workflow and persuasive copy</p>
            <div className="mt-3">
                <h4 className="font-medium">Stages</h4>
                <ol className="list-decimal list-inside mt-2 text-sm">
                    <li>
                        <strong>Import & Segment:</strong> Upload CSV, create segments for 3, 7, 14 days inactive — deliverable: screenshot of segments.
                    </li>
                    <li>
                        <strong>Define Goals & KPIs:</strong> Completion rate, open rate, CTR — deliverable: short doc.
                    </li>
                    <li>
                        <strong>Write Email Copy:</strong> 3 emails (3d, 7d, 14d) with subject, body, CTA — deliverable: table.
                    </li>
                    <li>
                        <strong>Build Workflow:</strong> Set triggers & waits — deliverable: screenshot of workflow.
                    </li>
                    <li>
                        <strong>Execute & Track:</strong> Run in sandbox, capture metrics — deliverable: 1-page performance report.
                    </li>
                </ol>
            </div>

            <div className="mt-4">
                <h4 className="font-medium">Final Deliverables</h4>
                <ul className="list-disc list-inside text-sm">
                    <li>Learner segments screenshot</li>
                    <li>Goal + KPIs doc</li>
                    <li>Email copy table</li>
                    <li>Workflow screenshot + explanation</li>
                    <li>Performance report</li>
                </ul>
            </div>
        </div>
    );
}
