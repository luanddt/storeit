import Header from "@/components/Header";
import MobileNavigation from "@/components/MobileNavigation";
import Sidebar from "@/components/Sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="h-screen flex">
            <Sidebar />

            <section className="flex flex-[1] flex-col">
                <MobileNavigation />
                
                <Header />

                <div className="bg-light-400 h-full md:px-9 px-5 md:py-10 py-7 sm:rounded-[30px] sm:mr-7 sm:mb-7">
                    {children}
                </div>
            </section>
        </main>
    );
};

export default MainLayout;