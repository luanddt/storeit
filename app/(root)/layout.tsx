import Header from "@/components/Header";
import MobileNavigation from "@/components/MobileNavigation";
import Sidebar from "@/components/Sidebar";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
    const currentUser = await getCurrentUser();

    if(!currentUser) return redirect("/sign-in");
    
    return (
        <main className="h-screen flex">
            <Sidebar {...currentUser} />

            <section className="flex flex-[1] flex-col">
                <MobileNavigation {...currentUser} />
                
                <Header
                    userId={currentUser.$id}
                    accountId={currentUser.accountId}
                />

                <div className="bg-light-400 h-full md:px-9 px-5 md:py-10 py-7 sm:rounded-[30px] sm:mr-7 sm:mb-7">
                    {children}
                </div>
            </section>
        </main>
    );
};

export default MainLayout;