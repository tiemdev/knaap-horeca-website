import { PageLayout } from "../components/PageLayout";

export function ForgotPasswordPage() {
    return (
        <PageLayout
            headerProps={{ showSearch: false }}
            breadcrumbs={[{ url: '/', title: 'Home' }, { url: '/forgot-password', title: 'Wachtwoord vergeten' }]}
        >
            <div className="flex justify-center px-5 py-10 sm:px-10 sm:py-14">
                <div className="w-full max-w-[420px] rounded-md border border-[#ececec] p-6 sm:p-8">
                    <h1 className="mb-6 text-[28px] font-bold text-[#123f30]">Wachtwoord vergeten</h1>
                    <p className="mb-6 text-[14.5px] text-[#5c665e]">Vul hieronder uw e-mailadres in en wij sturen u een link om uw wachtwoord te resetten.</p>
                    <form className="flex flex-col gap-4">
                        <input
                            type="email"
                            placeholder="E-mailadres"
                            className="rounded border border-[#ececec] bg-white px-4 py-3 text-sm text-[#5c665e] focus:border-[#123f30] focus:outline-none focus:ring-1 focus:ring-[#123f30]"
                        />
                        <button
                            type="submit"
                            className="flex min-h-11 items-center justify-center rounded bg-[#123f30] px-5.5 text-[14.5px] font-semibold text-white hover:bg-[#0f2e23] focus:outline-none focus:ring-2 focus:ring-[#123f30] focus:ring-offset-2"
                        >
                            Wachtwoord resetten
                        </button>
                    </form>
                </div>
            </div>
        </PageLayout>
    )
}
