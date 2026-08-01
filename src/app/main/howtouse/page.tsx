"use client";

import React, { useState } from "react";
import { GraduationCap, Briefcase } from "lucide-react";

export default function HowToUse() {
  const [currentTab, setCurrentTab] = useState<"talents" | "coaches">("talents");

  return (
    <div className="bg-[#FDFDFF] font-figtree pt-26 lg:pt-32 pb-20 px-[5%] lg:px-[10%] min-h-screen text-[#161925]">
      <div className="2xl:container mx-auto flex flex-col lg:flex-row gap-8 items-start">

        {/* Left Sidebar */}
        <div className="w-full lg:w-[260px] lg:sticky lg:top-32 flex flex-col gap-4 z-10 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-[#161925]">How to Use</h2>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => setCurrentTab("talents")}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${currentTab === "talents"
                  ? "bg-[#EEF0FF] text-[#596AFE] shadow-sm shadow-[#EEF0FF]"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }`}
              >
                <GraduationCap className="w-4 h-4" />
                For talents
              </button>

              <button
                onClick={() => setCurrentTab("coaches")}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${currentTab === "coaches"
                  ? "bg-[#EEF0FF] text-[#596AFE] shadow-sm shadow-[#EEF0FF]"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }`}
              >
                <Briefcase className="w-4 h-4" />
                For coaches
              </button>
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-12 min-h-[70vh]">

          {/* TALENTS GUIDE */}
          {currentTab === "talents" && (
            <article className="space-y-6 text-[#161925] leading-relaxed text-sm lg:text-base max-w-none">
              <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight border-b border-gray-100 pb-4 text-gray-900">
                Guide for Talents
              </h1>

              <p className="text-gray-700">
                Hi Talents, if you’re here it means you're passionate about building your digital career. Ryzly helps talents like you build and generate real portfolio that attract employers and clients. At the end of every challenge, you will be able to generate a sharable portfolio which is a practical proof of work and speaks better than any CV or resume. Join hundreds of other digital talents and start gaining experience that matter.
              </p>

              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">Landing Page:</h3>
                <p className="text-gray-700 mb-2">On the landing page- there is are options for</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>
                    <strong className="text-gray-900">Sign In:</strong> For returning users, click on sign in, input your registered email address, after which an OTIP code is sent to your inbox(ensure to check all email folders including spam and promotion). Fill this in and you land on the dashboard successfully.
                  </li>
                  <li>
                    <strong className="text-gray-900">Signup:</strong> This option is for new users who want to access the platform. They would need to sign up with an unregistered email address to access the platform.
                  </li>
                  <li>
                    <strong className="text-gray-900">Onboarding:</strong> after signup, you will go through the onboarding experience where you input personal information such as first and last name, interests. This will help personalise your experience on the Ryzly Platform.
                  </li>
                  <li>
                    <strong className="text-gray-900">Profile Set Up:</strong> Once you land on the dashboard, ensure to complete your profile setup. Click on the complete profile button on the dashboard or on settings to update your profile. Filling in the required fields such as username, skills, etc.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">How to find a Challenge:</h3>
                <p className="text-gray-700 mb-2">On the challenge details page and dashboard, find a challenge using these options:</p>
                <ul className="list-none pl-4 space-y-2 text-gray-700">
                  <li><strong className="text-gray-900">i) Search:</strong> Access the different challenges using the Search Icon at the top right of your screen.</li>
                  <li><strong className="text-gray-900">ii) For you:</strong> These highlight challenges that match your career interests.</li>
                  <li><strong className="text-gray-900">iii) Explore:</strong> To discover all challenges, use the explore option to access more challenges, not restricted to your desired track.</li>
                  <li><strong className="text-gray-900">iv) Using the filter:</strong> Use the filter button to select the level (beginner, intermediate, advanced), the different tracks available, and the specific type of challenge.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">Available Tracks:</h3>
                <p className="text-gray-700">
                  Product Management, Data Analysis, Product Design, Cybersecurity, Digital Marketing, Software Engineering(this will be ongoing updates)
                </p>
              </div>

              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">Challenge Details Page:</h3>
                <p className="text-gray-700 mb-2">
                  When you select a particular challenge, on the challenge details page, an overview of the challenge is displayed after which you can continue to join the challenge. Once you join the challenge, you will see
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong className="text-gray-900">A progress Tracker:</strong> Once you have joined, this shows your progress, for the duration of time for each task, and the overall number of tasks for the challenge you have completed and has been graded by the coach.</li>
                  <li><strong className="text-gray-900">Overview Tab:</strong> This contains: Challenge Name & Full Description, Coach Name (e.g., Gloria Ojokwu, Senior PM), Requirements needed to join (e.g., background knowledge of the challenge).</li>
                  <li><strong className="text-gray-900">Tasks Tab:</strong> This contains, list of individual tasks for the challenge, status (Submitted, Pending, Due Date), Your assigned Score.</li>
                  <li><strong className="text-gray-900">Resource Tab:</strong> Contains all links, articles, templates, and files needed to successfully complete the challenge tasks.</li>
                  <li><strong className="text-gray-900">Reviews Tab:</strong> Shows detailed feedback and grades on your submitted work from the coaches of the challenge.</li>
                  <li><strong className="text-gray-900">Participants:</strong> This shows the different participants of the challenge. Having an opportunity to connect and interact with other participants of the challenge.</li>
                  <li><strong className="text-gray-900">Coaches:</strong> These show the different coaches who are participating in the challenge.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Participating In the Challenge</h3>

                <h4 className="text-lg font-bold text-gray-800 mt-6 mb-2">Completing a task:</h4>
                <p className="text-gray-700">To submit a task - click on the pending task.</p>

                <h4 className="text-lg font-bold text-gray-800 mt-6 mb-2">This takes you to the submission page:</h4>
                <p className="text-gray-700 mb-2">
                  The submission involves: the image of your work, The title of your work, the description, the links to your work and tools used.
                </p>
                <p className="text-gray-700">
                  After which the submission is completed, moving the status of the task from <strong>pending to submitted.</strong>
                </p>

                <h4 className="text-lg font-bold text-gray-800 mt-6 mb-2">Generating Your Portfolio:</h4>
                <p className="text-gray-700 mb-2">
                  The Portfolio showcases your completed solution to the challenge and this can be seen by companies and clients.
                </p>
                <p className="text-gray-700">
                  After submitting all required tasks and having been graded by the coach, a create Portfolio button appears.
                </p>

                <h4 className="text-lg font-bold text-gray-800 mt-6 mb-2">Portfolio generation:</h4>
                <p className="text-gray-700">
                  You fill in certain details on the portfolio generation form, and after which your portfolio is created.
                </p>

                <h4 className="text-lg font-bold text-gray-800 mt-6 mb-2">Accessing your Portfolio:</h4>
                <p className="text-gray-700 mb-2">
                  Go to the <strong>portfolio tab</strong> to view your portfolio.
                </p>
                <p className="text-gray-700 mb-2">
                  In the portfolio tab you have access to view other participants' portfolios by clicking on <strong>ALL PORTFOLIO.</strong>
                </p>
                <p className="text-gray-700">
                  To view your portfolio - click on <strong>MY PORTFOLIO</strong>.
                </p>
              </div>

              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">How to connect with other Participants:</h3>
                <p className="text-gray-700">
                  A Real-Time Live Chat - A space for only participants of the challenge to interact, share knowledge, not just limited to chats, pictures and videos inclusive.
                </p>
              </div>

              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">Understanding the status of your challenges as a returning user:</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong className="text-gray-900">Ongoing:</strong> The challenge is currently running, and you are actively participating. You must submit your tasks to maintain your streak.</li>
                  <li><strong className="text-gray-900">Completed:</strong> You have successfully finished the entire challenge and have been graded.</li>
                  <li><strong className="text-gray-900">Upcoming:</strong> You have signed up for the challenge, but the official start date is still in the future.</li>
                  <li><strong className="text-gray-900">Bookmark:</strong> You are interested in this challenge and have saved it, but you have not yet joined.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">Achievements:</h3>
                <p className="text-gray-700 mb-2">
                  The leaderboard is divided into two: <strong>In-challenge leaderboard</strong>: this leaderboard is only in a particular challenge.
                </p>
                <p className="text-gray-700 mb-2">
                  <strong className="text-gray-900">How it is calculated:</strong> the top challenge participants by the highest class average for a particular challenge.
                </p>
                <p className="text-gray-700">
                  The cumulative challenge average for a user is the sum total of the tasks divided by the number of challenges and render the highest top 10 and their positions. If more than 1 talent gets the same score, The user that submitted first is considered first.
                </p>

                <h4 className="text-lg font-bold text-gray-800 mt-6 mb-2">Global Leaderboard:</h4>
                <p className="text-gray-700 mb-2">
                  This leaderboard cuts across the platform not just inside a particular challenge.
                </p>
                <p className="text-gray-700 mb-4">
                  Here the cumulative average cuts across the challenge, it shows the top 10 talents with highest ryzly points across the challenges.
                </p>

                <ul className="list-disc pl-6 space-y-4 text-gray-700">
                  <li>
                    <strong className="text-gray-900">Badges: Rookie Rhyzer:</strong> This badge is given when the talent completes the following milestones: Talent completes their profile, Joins at least 1 challenge. Completes 1 challenge and adds it to their portfolio.
                    <p className="mt-1 text-gray-600">
                      Scores a cumulative average of 50% or more in at least 1 challenge (cumulative average = total average from each challenge ÷ total number of challenges).
                    </p>
                  </li>
                  <li>
                    <strong className="text-gray-900">Active Rhyzer:</strong> This badge is given to the talent who completes the following milestones: Completed at least 5 challenges across at least 2 levels. Got an average cumulative score &ge; 60% across all challenges. Gave 3 or more peer reviews/help rated 'helpful' by peers.
                    <p className="mt-1 text-gray-600">Maintained at least a 7-day challenge streak.</p>
                  </li>
                  <li>
                    <strong className="text-gray-900">Champ Rhyzer:</strong> This badge is awarded when the talent completes the following milestones: Completed 10 or more challenges, including at least 3 advanced-level ones in one track. Got an average cumulative score &ge; 80% across all challenges. Gave 5 or more peer reviews/help rated 'helpful' by peers. Participated in at least 1 group challenge (team collaboration).
                  </li>
                  <li>
                    <strong className="text-gray-900">Certificates:</strong> After completing a challenge successfully, go to the achievement tab to download your certificate.
                  </li>
                  <li>
                    <strong className="text-gray-900">Go to certificates:</strong> click on your certificate to download, and choose which format is best suitable for you (pdf, jpeg).
                  </li>
                </ul>
              </div>
            </article>
          )}

          {/* COACHES GUIDE */}
          {currentTab === "coaches" && (
            <article className="space-y-6 text-[#161925] leading-relaxed text-sm lg:text-base max-w-none">
              <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight border-b border-gray-100 pb-4 text-gray-900">
                Guide for Career Coaches
              </h1>

              <p className="text-gray-700">
                Hi Coach, this guide has been put together for career coaches who qualify for the coaching monetization program to understand how to go about creating and running challenges on Ryzly. If you still have any questions after going through this, do well to reach out to the support team at <a href="mailto:support@ryzly.app" className="text-[#596AFE] hover:underline">support@ryzly.app</a>.
              </p>

              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">Landing Page:</h3>
                <p className="text-gray-700 mb-2">On the landing page- there is an option for signing in- for returning users and login for new users.</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>
                    <strong className="text-gray-900">Login:</strong> This option is for new users who want to access the platform. They would need to sign up with their email address to access the platform.
                  </li>
                  <li>
                    <strong className="text-gray-900">Profile Set Up:</strong> Click on settings to update your profile. Filling in the required fields such as username, skills, etc.
                  </li>
                  <li>
                    <strong className="text-gray-900">Sign In:</strong> For returning users, click on sign in, input your email address, after which a code is sent to your inbox. Fill this in and you have joined successfully.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">Upgrading to Coach Mode and Creating a Challenge:</h3>
                <p className="text-gray-700 mb-4">
                  To begin creating a challenge, you first need to access the coach functions by applying into the coach mode. Look for the <strong>"Create Challenges"</strong> button, usually located in the right corner in all the tabs (Dashboard, challenge, achievements, settings).
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Click <strong>"Create Challenges"</strong>. A drop-down will appear, prompting you to fill in the challenge details.</li>
                  <li>
                    <strong className="text-gray-900">Filling Out the Challenge Requirements:</strong> You must complete all required fields to submit your challenge for approval.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">Requirements to apply for a Challenge:</h3>

                {/* Tables Grid */}
                <div className="space-y-6 mt-4">
                  <div className="overflow-x-auto rounded-xl border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">Requirement</th>
                          <th scope="col" className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">Description</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 text-sm lg:text-base">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">Image</td>
                          <td className="px-6 py-4 text-gray-600">Insert a relevant image for your challenge.</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">Description</td>
                          <td className="px-6 py-4 text-gray-600">A detailed overview of what the challenge is all about.</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">Winning Prize</td>
                          <td className="px-6 py-4 text-gray-600">The reward for the successful participant(s) of the challenge.</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">Level</td>
                          <td className="px-6 py-4 text-gray-600">Select the level of difficulty: Newbie, Beginner, Mid-level, or Advanced.</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">Industry</td>
                          <td className="px-6 py-4 text-gray-600">Specify the industry: Tech, EdTech, AgriTech, HealthTech, FinTech, or Business.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">Requirement</th>
                          <th scope="col" className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">Description</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 text-sm lg:text-base">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">Title</td>
                          <td className="px-6 py-4 text-gray-600">The name of your challenge.</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">Participation Fee</td>
                          <td className="px-6 py-4 text-gray-600">The cost for participants to join the challenge.</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">Start and End Date</td>
                          <td className="px-6 py-4 text-gray-600">Define the duration of the challenge.</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">Tracks</td>
                          <td className="px-6 py-4 text-gray-600">Choose the required tracks: Product Management, Cybersecurity, Digital Marketing, Data Analyst, or Software Engineering.</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">Tags</td>
                          <td className="px-6 py-4 text-gray-600">Add relevant tags for better searchability, such as figma, python, c++, etc.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">Switching to Coach Mode and Creating a New Challenge:</h3>

                {/* Image 1 */}
                <div className="my-6 max-w-3xl mx-auto border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="relative aspect-[16/9] w-full bg-white flex items-center justify-center p-2">
                    <img
                      src="/howtouse/coach_image_1.png"
                      alt="Coach Mode challenge creation mockup"
                      className="max-w-full h-auto object-contain rounded"
                    />
                  </div>
                </div>

                <p className="text-gray-700 mt-4">
                  After getting approval as a coach, to switch to the coach mode, at the right corner, a tab - as participants, or coach. Here you can switch to coach mode to be able to create challenges, view your drafts, pending challenges as well as ongoing challenges.
                </p>
              </div>

              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">Understanding the status of your Challenge as a Coach:</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>
                    <strong className="text-gray-900">Draft:</strong> This is your rough work, which is still in process. The challenge details have been submitted, but tasks have NOT yet been added. The challenge is inactive and only visible to you.
                  </li>
                  <li>
                    <strong className="text-gray-900">Pending:</strong> Here tasks have been added. The challenge is complete and waiting for the Admin to review and approve it to go live.
                  </li>
                  <li>
                    <strong className="text-gray-900">Ongoing:</strong> This shows challenges that have been approved and is currently live. Participants can actively join and complete tasks.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">Adding Tasks to Your Challenge:</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>After submission, your challenge will appear on the status of the Challenge Tab under draft, meaning the basic details are set, but the specific tasks haven't been added yet.</li>
                  <li>Click on the challenge on the draft tab, to open it. On the Challenge Details Page, look for the "Add Task" icon. Click on this icon.</li>
                  <li>A drop-down form will appear for each task. You need to fill in: Title of the task. Description of the task (instructions for the participant). Start and End Date for completing that specific task. After filling in the details for all necessary tasks, click Submit.</li>
                  <li>On the tasks description: There is an option for an image, video and link to be added which would serve as a task guide to aid the participants in the challenge.</li>
                  <li>On the top right corner of the challenge page: three blue buttons for the coach to edit the basic details such as the description, title, participation fee, winning prize, start and end date. All these can be edited as it is pending approval from the admin.</li>
                </ul>

                <p className="text-gray-700 mt-4">
                  When you open each task, you will be able to see the talents' submissions, filter by “all”, “not reviewed” and “reviewed”. Ensure to give fast and accurate feedbacks on the submissions to enable talents to improve faster.
                </p>

                <p className="text-gray-700 mt-4 font-semibold bg-amber-50/50 p-4 rounded-xl border border-amber-100">
                  Important Notes: all talents must have their tasks graded with feedback: this is paramount to the quality of challenge. Only give the number of tasks you can grade considering the time frame and number of learners. You can always give more time to the task to allow for more time to grade.
                </p>
              </div>

              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-3">Navigating the Challenge Details Page:</h3>
                <p className="text-gray-700 mb-4">
                  The Challenge Details Page is your hub for managing the challenge and sharing information with participants. It has multiple tabs:
                </p>

                {/* Image 2 */}
                <div className="my-6 max-w-3xl mx-auto border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="relative aspect-[16/9] w-full bg-white flex items-center justify-center p-2">
                    <img
                      src="/howtouse/coach_image_2.png"
                      alt="Challenge details dashboard overview"
                      className="max-w-full h-auto object-contain rounded"
                    />
                  </div>
                </div>

                <ul className="list-disc pl-6 space-y-3 text-gray-700 mt-4">
                  <li><strong className="text-gray-900">Overview Tab:</strong> This tab sets the stage and provides essential context for potential participants.</li>
                  <li><strong className="text-gray-900">Coach Description:</strong> Contains details about the coach (you).</li>
                  <li><strong className="text-gray-900">Requirements for the Challenge:</strong> Specifies prerequisite skills or knowledge (e.g., "a simple knowledge of Figma," or "must be a beginner product manager").</li>
                  <li><strong className="text-gray-900">Who the Challenge is for:</strong> Clarifies the required participants to join the challenge.</li>
                  <li><strong className="text-gray-900">Progress Tracker:</strong> This shows the duration at which the challenge would last. e.g. 0/10days.</li>
                  <li>
                    <strong className="text-gray-900">Resource Tab:</strong> This is where you provide helpful materials to assist participants. Use this tab to share resources such as guides, links, docs, or files that participants might need to aid them in the challenge. Think of them as:
                    <div className="mt-2 pl-4 text-sm font-semibold text-gray-800 space-y-1">
                      <div>🟡 Warm-ups</div>
                      <div>🟡 How-to helpers</div>
                      <div>🟡 Quick explanations</div>
                      <div>🟡 Prep Materials</div>
                      <div>🟡 Challenge execution guides</div>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">NOT full classes, NOT modules, NOT learning paths.</p>
                  </li>
                  <li><strong className="text-gray-900">Task Tab:</strong> This tab offers a clear view of the structured work. It displays the various tasks you have included for the challenge, allowing you and the participants to track progress.</li>
                  <li><strong className="text-gray-900">Leaderboard:</strong> This shows the top participants of your challenge, those who submitted their tasks before the deadline, etc.</li>
                  <li><strong className="text-gray-900">Coaches tab:</strong> In this section you can search for any coach of your choosing or add a coach to join you on your challenge. Mentoring is fun with like minds.</li>
                  <li><strong className="text-gray-900">Participants tab:</strong> Here the coach has access to view all registered participants for the challenge.</li>
                  <li><strong className="text-gray-900">Real-Time Live Chat:</strong> A space for the coach to interact with the participants of the challenge, announcements for the challenge can be dropped here, materials to aid the challenge, to interact, share knowledge, not just limited to chats, pictures and videos inclusive.</li>
                </ul>

                <p className="mt-4 font-semibold text-red-700 bg-red-50/50 p-4 rounded-xl border border-red-100">
                  On the last day of any challenge, ensure to end the challenge by clicking the “end challenge” button. This is important to enable certificate issuance and for learners to be able to generate their portfolio. Failure to do this might result to reports from the talents which might in turn lead to account Ban.
                </p>
              </div>

              {/* Sample Blueprint section */}
              <div className="border-t border-gray-100 pt-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-12 mb-6">
                  🎓 Boost Course Completion with Mailchimp + Copywriting
                </h2>

                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Track: Digital Marketing</li>
                  <li>Industry: EdTech</li>
                  <li>Level: mid-level</li>
                  <li>
                    Tags:
                    <ul className="list-circle pl-6 space-y-1 mt-1 text-gray-600">
                      <li>Email Marketing</li>
                      <li>Mailchimp</li>
                      <li>Copy Writing</li>
                      <li>Email Automation</li>
                    </ul>
                  </li>
                </ul>

                <h4 className="text-xl font-bold text-gray-900 mt-8 mb-2">Overview</h4>
                <p className="text-gray-700 mb-4">
                  You are a <strong>Digital Marketer</strong> at <strong>SkillHive</strong>, an EdTech platform offering online courses.
                </p>
                <p className="text-gray-700 mb-4">
                  Many learners enroll in online courses but don’t complete them. SkillHive wants to increase course completion rates by sending automated course reminder emails.
                </p>
                <p className="text-gray-700">
                  Your task: design and execute a course reminder workflow in Mailchimp, including writing persuasive email copy for each step of the workflow.
                </p>

                <h4 className="text-xl font-bold text-gray-900 mt-8 mb-2">Challenge Outcome</h4>
                <p className="text-gray-700 mb-2">
                  Talents will be able to show a high level portfolio that demonstrates ability:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>to execute automated campaigns,</li>
                  <li>to craft persuasive emails for engagement and completion,</li>
                  <li>Ability to analyze performance and optimize.</li>
                </ul>

                <h4 className="text-xl font-bold text-gray-900 mt-8 mb-2">Challenge Rules</h4>
                <p className="text-gray-700 mb-2">This is where you set the rules of the challenge, example:</p>
                <ul className="list-disc pl-6 text-gray-700">
                  <li>talents must be present for group discussions when it’s time.</li>
                </ul>

                <h4 className="text-xl font-bold text-gray-900 mt-8 mb-2">Challenge Includes</h4>
                <p className="text-gray-700 mb-2">(everything your challenge includes, example assets, briefs, data sets, aws credit, etc)</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Mailchimp sandbox/demo account</li>
                  <li>Sample learner database (CSV: name, email, course enrolled, last login)</li>
                  <li>Sample email template examples</li>
                </ul>

                <h4 className="text-xl font-bold text-gray-900 mt-8 mb-2">Tasks/Prompts</h4>
                <p className="text-gray-700 mb-4">
                  (Note: tasks can come with instructions to explain how the challenge execution, examples and best approach for the task. This is one of the most important parts of the challenge. Talents love video instructions more). The tasks are broken into stages. Avoid adding long minutes videos to help with learner retention.
                </p>

                <div className="space-y-6">
                  <div>
                    <h5 className="font-bold text-gray-900 text-base lg:text-lg mt-4 mb-2">Stage 1: Import Learners & Create Segments</h5>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700 mt-1">
                      <li>Upload CSV into Mailchimp</li>
                      <li>Segment learners based on inactivity:
                        <ul className="list-circle pl-6 space-y-1 mt-1 text-gray-600">
                          <li>3 days inactive</li>
                          <li>7 days inactive</li>
                          <li>14 days inactive</li>
                        </ul>
                      </li>
                    </ul>
                    <p className="text-gray-700 mt-2"><strong>Deliverable:</strong> Screenshot of uploaded list and segments</p>
                    <p className="text-gray-600 text-xs mt-1">
                      <strong>Coach Notes:</strong> Emphasize correct segmentation and dynamic updates. Ensure learners understand tags, audience segmentation, and filtering. Ensure each talent has their own unique deliverable.
                    </p>
                  </div>

                  <div className="border-t border-gray-100 pt-4">
                    <h5 className="font-bold text-gray-900 text-base lg:text-lg mt-4 mb-2">Stage 2: Define Automation Goals & KPIs</h5>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700 mt-1">
                      <li><strong>Goal:</strong> Increase free course completion using automated email reminders</li>
                      <li><strong>KPIs:</strong>
                        <ul className="list-circle pl-6 space-y-1 mt-1 text-gray-600">
                          <li>Course completion rate after workflow</li>
                          <li>Email open rate</li>
                          <li>Click-through rate on “Continue Course” CTA</li>
                        </ul>
                      </li>
                    </ul>
                    <p className="text-gray-700 mt-2"><strong>Deliverable:</strong> Short document stating goal + KPIs</p>
                  </div>

                  <div className="border-t border-gray-100 pt-4">
                    <h5 className="font-bold text-gray-900 text-base lg:text-lg mt-4 mb-2">Stage 3: Write Email Copy</h5>
                    <p className="text-gray-700 mb-2">For each trigger, learners write <strong>subject line + body + CTA</strong>:</p>

                    <div className="overflow-x-auto rounded-xl border border-gray-200 my-3">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase">Email</th>
                            <th scope="col" className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase">Trigger</th>
                            <th scope="col" className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase">Copy Objective</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 text-sm lg:text-base">
                          <tr>
                            <td className="px-6 py-4 font-bold text-gray-900">Email 1</td>
                            <td className="px-6 py-4 text-gray-600">3 days inactive</td>
                            <td className="px-6 py-4 text-gray-600">Friendly reminder to continue course</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 font-bold text-gray-900">Email 2</td>
                            <td className="px-6 py-4 text-gray-600">7 days inactive</td>
                            <td className="px-6 py-4 text-gray-600">Motivational: highlight course benefits and Challenge outcomes</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 font-bold text-gray-900">Email 3</td>
                            <td className="px-6 py-4 text-gray-600">14 days inactive</td>
                            <td className="px-6 py-4 text-gray-600">Urgent/encouraging: bonus content or limited-time incentive to complete course</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <p className="text-gray-700"><strong>Deliverable:</strong> Table of email copy including: Subject line, Body, CTA text, and Optional personalization tokens (e.g. first name, course title).</p>
                    <p className="text-gray-600 text-xs mt-1">
                      <strong>Coach Notes:</strong> Assess clarity, persuasiveness, and alignment with workflow goals. Encourage testing variations for A/B testing.
                    </p>
                  </div>

                  <div className="border-t border-gray-100 pt-4">
                    <h5 className="font-bold text-gray-900 text-base lg:text-lg mt-4 mb-2">Stage 4: Build Automation Workflow in Mailchimp</h5>
                    <p className="text-gray-700 mb-2">Use <strong>Customer Journey Builder</strong> or <strong>Classic Automation</strong></p>

                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-xs font-mono text-gray-700 my-2">
                      [Segment: Inactive 3 Days] &rarr; Email 1 &rarr; Wait 4 days &rarr; [Segment: Inactive 7 Days] &rarr; Email 2 &rarr; Wait 7 days &rarr; [Segment: Inactive 14 Days] &rarr; Email 3
                    </div>

                    <ul className="list-disc pl-6 space-y-1 text-gray-700 mt-2">
                      <li>Set delays, personalization, and optional A/B tests</li>
                      <li>Insert learner-written email copy</li>
                    </ul>
                    <p className="text-gray-700 mt-2"><strong>Deliverable:</strong> Screenshot of workflow + explanation of each step</p>
                    <p className="text-gray-600 text-xs mt-1">
                      <strong>Coach Notes:</strong> Focus on correct triggers, delays, and personalization. Check that copy is applied correctly in platform templates.
                    </p>
                  </div>

                  <div className="border-t border-gray-100 pt-4">
                    <h5 className="font-bold text-gray-900 text-base lg:text-lg mt-4 mb-2">Stage 5: Execute & Track</h5>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700 mt-1">
                      <li>Send test workflow to sandbox/test list</li>
                      <li>Track simulated metrics: Open rates, Click-through rates, Course completion simulation</li>
                    </ul>
                    <p className="text-gray-700 mt-2"><strong>Deliverable:</strong> 1-page Performance Report with platform metrics + insights</p>
                    <p className="text-gray-600 text-xs mt-1">
                      <strong>Coach Notes:</strong> Evaluate learner’s ability to analyze results and suggest optimization. Encourage discussion of which copy/email performed best and why.
                    </p>
                  </div>

                  <div className="border-t border-gray-100 pt-4">
                    <h5 className="font-bold text-gray-900 text-base lg:text-lg mt-4 mb-2">Optional Extension</h5>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700 mt-1">
                      <li>Conduct A/B test on subject line or CTA copy for one of the emails</li>
                      <li>Simulate results and adjust workflow accordingly</li>
                    </ul>
                  </div>

                  <div className="border-t border-gray-100 pt-4">
                    <h5 className="font-bold text-gray-900 text-base lg:text-lg mt-4 mb-2">Final Deliverables</h5>

                    <div className="overflow-x-auto rounded-xl border border-gray-200 my-3">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase">Deliverable</th>
                            <th scope="col" className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase">Description</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 text-sm lg:text-base">
                          <tr>
                            <td className="px-6 py-4 font-bold text-gray-900">Learner Segments</td>
                            <td className="px-6 py-4 text-gray-600">Screenshot showing segments in Mailchimp</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 font-bold text-gray-900">Automation Goal + KPI</td>
                            <td className="px-6 py-4 text-gray-600">Short document with measurable objective</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 font-bold text-gray-900">Email Copy</td>
                            <td className="px-6 py-4 text-gray-600">Table of subject lines, body, CTA, personalization</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 font-bold text-gray-900">Workflow Setup</td>
                            <td className="px-6 py-4 text-gray-600">Screenshot of automation workflow + explanation</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 font-bold text-gray-900">Mock Campaign Execution</td>
                            <td className="px-6 py-4 text-gray-600">Screenshots of test emails in Mailchimp</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 font-bold text-gray-900">Performance Report</td>
                            <td className="px-6 py-4 text-gray-600">Analytics screenshot + insights/recommendations</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 font-bold text-gray-900">Optional A/B Test Results</td>
                            <td className="px-6 py-4 text-gray-600">Simulation of optimized copy</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mt-6 font-semibold">
                  Note: encourage talents to use high quality visuals when generating their portfolio. So that it can be attractive on the portfolio page.
                </p>

                <p className="text-gray-700 mt-4 text-base font-bold border border-blue-100 bg-blue-50/50 p-4 rounded-xl">
                  Remember: Ryzly is outcome-first, not course-first. Focus on tasks and their execution that produce proof, not random video courses.
                </p>
              </div>

            </article>
          )}

        </div>
      </div>
    </div>
  );
}