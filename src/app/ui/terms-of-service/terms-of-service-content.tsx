export default function TermsOfServiceContent() {
    return (
        <>
            <section className="py-2">
                <h3 className="font-medium text-base">Introduction</h3>
                <p>Welcome to our Work Assistant!</p> 
                <p>By registering and using our service, you agree to the following terms and conditions.</p>
            </section>

            <section className="py-2">
                <h3 className="font-medium text-base">Data Collection</h3>
                <h4 className="font-medium">Personal Information</h4>
                <ul className="list-disc pl-6">
                    <li><strong>Email Address and Profile Information:</strong> When you sign in with Google, we receive your email address, name, and profile picture from your Google account. This information is used to create and identify your account.</li>
                </ul>
                <h4 className="font-medium">Task Data</h4>
                    <ul className="list-disc pl-6">
                        <li><strong>Tasks:</strong> Details of the tasks you create, including title, description, status, planed completion time</li>
                        <li><strong>Time tracks:</strong> Records of time spent on tasks</li>
                    </ul>
            </section>

            <section className="py-2">
                <h3 className="font-medium text-base">Use of Collected Data</h3>
                <h4 className="font-medium">Personal Information</h4>
                <p>Your personal information will be used solely for account-related purposes, including</p>
                <ul className="list-disc pl-6">
                    <li><strong>Authentication</strong>, making sure the user is who they say they are</li>
                </ul>
                <p>Authentication is handled through Google OAuth. When you sign in, you are redirected to Google where you authorize access. We then receive your basic profile information (email address, name, and profile picture) to create or identify your account. We do not have access to your Google password or any other Google data beyond what is listed above.</p>
                <h4 className="font-medium mt-1">Task Data</h4>
                <p>Your task data will be used to</p>
                <ul className="list-disc pl-6">
                    <li>Provide you with the task management and time tracking services</li>
                    <li>Generate reports and insights related to your tasks and time tracks</li>
                </ul>
            </section>

            <section className="py-2">
                <h3 className="font-medium text-base">Data Protection</h3>
                <p>We take the security of your data seriously and implement appropriate measures to protect it from unauthorized access, alteration, disclosure, or destruction. These measures include</p>
                <ul className="list-disc pl-6">
                    <li><strong>Every request and attempt to retrieve or modify data is verified on the server side to ensure that the data is assigned to the logged-in user</strong></li>
                    <li>All communication between your browser and our servers is encrypted via HTTPS</li>
                    <li>Authentication is delegated to Google OAuth, so we never store or handle your password</li>
                    <li>Regularly updating our security practices to align with industry standards</li>
                </ul>
            </section>

            <section className="py-2">
                <h3 className="font-medium text-base">Data Sharing</h3>
                <p><strong>We do not sell your personal information or task data.</strong> However, we rely on the following third-party service providers to operate the application</p>
                <ul className="list-disc pl-6">
                    <li><strong>Google</strong> (authentication) — used solely to verify your identity during sign-in. We do not share your task data or any other application data with Google.</li>
                    <li><strong>Vercel</strong> (hosting) — the application is hosted on Vercel. Vercel processes incoming requests and may have access to data transmitted during those requests (e.g. IP addresses, request metadata).</li>
                    <li><strong>Neon / Vercel Postgres</strong> (database) — your account data and task data are stored in a PostgreSQL database managed by Neon through Vercel Postgres.</li>
                </ul>
                <p className="mt-1">These providers act as data processors on our behalf and are bound by their own privacy policies and terms of service. Beyond these providers, we do not share your data with third parties except as necessary to</p>
                <ul className="list-disc pl-6">
                    <li>Comply with legal obligations</li>
                    <li>Protect our rights and safety, or the rights and safety of our users</li>
                </ul>
            </section>

            <section className="py-2">
                <h3 className="font-medium text-base">User Rights</h3>
                <p>As a user, you have the following rights regarding your data</p>
                <ul className="list-disc pl-6">
                    <li><strong>Access</strong>: You have access to the personal information (Account) and task data (Tasks, Time tracks) we hold about you from application level</li>
                    <li><strong>Deletion</strong>: You can permanently delete your account and all associated data, your tasks and time tracks from application level (Account &gt; Delete Account)</li>
                </ul>
            </section>

            <section className="py-2">
                <h3 className="font-medium text-base">Changes to Terms</h3>
                <p>We may update these terms from time to time. If we make significant changes, we will notify you through a notice on our website. Your continued use of the service after such changes signifies your acceptance of the updated terms.</p>
            </section>
            
            <section className="py-2">
                <h3 className="font-medium text-base">Contact Us</h3>
                <p>If you have any questions or concerns about these terms or our data practices, please <a className="text-violet-500 hover:underline" href="mailto:pawel.gargula@interia.pl?subject=Work%20assistant">contact us at pawel.gargula@interia.pl</a>.</p>
            </section>

            <p className="py-2">By registering for and using our service, you acknowledge that you have read, understood, and agree to be bound by these terms.</p>
        </>
    )
}