import { Dispatch, SetStateAction, useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function TermsOfService({
    isTermsOfServiceAccepted,
    setIsTermsOfServiceAccepted
} : {
    isTermsOfServiceAccepted: boolean | undefined;
    setIsTermsOfServiceAccepted: Dispatch<SetStateAction<boolean>>
    ;
}) {
    const dialogRef = useRef<any>(null);

    return (
        <>
            <div className='flex items-center mt-3 mb-1'>
                <input 
                    className="accent-violet-500 border border-slate-300 cursor-pointer focus-visible:outline-violet-500 h-4 w-4" 
                    id="accept-terms-of-service" 
                    name="accept-terms-of-service" 
                    onChange={(e) => setIsTermsOfServiceAccepted(prevValue => !prevValue)}
                    type="checkbox" 
                    checked={isTermsOfServiceAccepted}
                />
                <label className="cursor-pointer ml-2" htmlFor='accept-terms-of-service'>
                    Agree our {" "}
                    <button className="focus-visible:outline-violet-500 hover:underline text-violet-700" 
                        onClick={(e) => {
                            e.preventDefault();
                            dialogRef.current?.showModal();
                        }} type="button"
                    >
                        Terms of Service and Privacy Policy
                    </button> 
                    {" "} to Sign in
                </label>
            </div>
            <dialog ref={dialogRef} className="max-w-screen-2xl rounded-md">
                <div className="bg-white flex justify-between items-center px-4 py-2 shadow sticky top-0">
                    <h2 className="font-medium text-lg">Terms of Service and Privacy Policy</h2>
                    <button 
                        autoFocus={true}
                        aria-label="Close" 
                        className="focus-visible:outline-violet-500 hover:text-violet-700"
                        onClick={() => dialogRef.current?.close()}
                        title="Close"
                        type="button"
                    >
                        <XMarkIcon className="w-5" />
                    </button>
                </div>
                <div className="divide-y px-6 pb-6">
                    <section className="py-2">
                        <h3 className="font-medium text-base">Introduction</h3>
                        <p>Welcome to our Work Assistant!</p> 
                        <p>By registering and using our service, you agree to the following terms and conditions.</p>
                    </section>

                    <section className="py-2">
                        <h3 className="font-medium text-base">Data Collection</h3>
                        <h4 className="font-medium">Personal Information</h4>
                        <ul className="list-disc pl-6">
                            <li><strong>Email Address:</strong> This is used to create your account, send activation/sign in links</li>
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
                        <p>Your email address will be used solely for account-related purposes, including</p>
                        <ul className="list-disc pl-6">
                            <li><strong>Authentication</strong>, making sure the user is who they say they are</li>
                        </ul>
                        <p>On initial sign in, a Verification Token is sent to the email address provided. This token is valid for 24 hours. If the Verification Token is used within that time (i.e. by clicking on the link in the email) your account is created and you are signed in. If you provide the email address of an existing account when signing in, an email is sent and you are signed into the account associated with that email address when you follow the link in the email.</p>
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
                            <li>Using secure servers and encryption technologies</li>
                            <li>Regularly updating our security practices to align with industry standards</li>
                        </ul>
                    </section>

                    <section className="py-2">
                        <h3 className="font-medium text-base">Data Sharing</h3>
                        <p><strong>We do not share your personal information or task data with third parties</strong>, except as necessary to</p>
                        <li>Comply with legal obligations</li>
                        <li>Protect our rights and safety, or the rights and safety of our users</li>
                    </section>

                    <section className="py-2">
                        <h3 className="font-medium text-base">User Rights</h3>
                        <p>As a user, you have the following rights regarding your data</p>
                        <li><strong>Access</strong>: You have access to the personal information (Account) and task data (Tasks, Time tracks) we hold about you from application level</li>
                        <li><strong>Deletion</strong>: You can permanently delete your account and all associated data, your tasks and time tracks from application level (Account &gt; Delete Account)</li>
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

                    <button
                         className="active:bg-violet-700 bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 hover:bg-violet-600 inline-flex items-center justify-center mt-2 py-1.5 rounded-md text-white w-full" 
                         onClick={() => {
                            dialogRef.current?.close();
                            setIsTermsOfServiceAccepted(true);
                         }}
                         type="button"
                    >Agree</button>
                </div>
            </dialog>
        </>
    )
}