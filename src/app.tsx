import {
  ArrowRight,
  AtSign,
  Calendar,
  MapPin,
  Plus,
  Settings2,
  UserRoundPlus,
  X,
} from "lucide-react";
import { FormEvent, useState } from "react";

export function App() {
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([
    "okayosilva@github.com",
  ]);

  function toggleGuestsInput() {
    setIsGuestsInputOpen((prevState) => !prevState);
  }

  function toggleGuestsModalOpen() {
    setIsGuestsModalOpen((prevState) => !prevState);
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;

    if (emailsToInvite.includes(email) || !email) {
      return;
    }

    setEmailsToInvite((prevState) => [...prevState, email]);
    event.currentTarget.reset();
  }

  function removeEmailToInvite(email: string) {
    const newEmailList = emailsToInvite.filter((emails) => emails !== email);
    setEmailsToInvite(newEmailList);
    // return setEmailsToInvite((prevState) =>
    //   prevState.filter((emails) => emails !== email)
    // );
  }
  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col justify-center items-center gap-3">
          <img src="/logo.svg" alt="logo" />
          <p className="text-zinc-300 text-lg">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>

        <div className="space-y-4">
          <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <div className="flex flex-1 items-center gap-2">
              <MapPin className="size-5 text-zinc-400" />
              <input
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                type="text"
                placeholder="Para onde você vai?"
                disabled={isGuestsInputOpen}
              />
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="size-5 text-zinc-400" />
              <input
                className=" bg-transparent text-lg placeholder-zinc-400 w-40 outline-none"
                type="text"
                placeholder="Quando?"
                disabled={isGuestsInputOpen}
              />
            </div>

            <div className="w-px bg-zinc-800 h-6"></div>

            {isGuestsInputOpen ? (
              <button
                onClick={toggleGuestsInput}
                className="bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700 transition-colors"
              >
                Alterar local/data
                <Settings2 className="size-5" />
              </button>
            ) : (
              <button
                onClick={toggleGuestsInput}
                className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400 transition-colors"
              >
                Continuar
                <ArrowRight className="size-5" />
              </button>
            )}
          </div>

          {isGuestsInputOpen && (
            <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
              <button
                onClick={toggleGuestsModalOpen}
                className="bg-transparent outline-none flex flex-1 items-center gap-2"
                type="button"
              >
                <UserRoundPlus className="size-5 text-zinc-400" />
                <span className="flex-1 text-left text-lg text-zinc-400">
                  Quem estará na viagem?
                </span>
              </button>

              <div className="w-px bg-zinc-800 h-6"></div>

              <button className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400 transition-colors">
                Confirmar viagem
                <ArrowRight className="size-5" />
              </button>
            </div>
          )}
        </div>
        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda{" "}
          <br /> com nossos{" "}
          <a className="text-zinc-300 underline" href="#">
            termos de uso
          </a>{" "}
          e{" "}
          <a className="text-zinc-300 underline" href="#">
            políticas de privacidade
          </a>
          .
        </p>
      </div>

      {isGuestsModalOpen && (
        <div className="z-10 fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecionar convidados</h2>
                <button type="button" onClick={() => toggleGuestsModalOpen()}>
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>
              <p className="text-sm text-zinc-400">
                Os convidados irão receber e-mails para confirmar a participação
                na viagem.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {emailsToInvite.map((email) => (
                <div
                  key={email}
                  className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2"
                >
                  <span className="text-zinc-300">{email}</span>
                  <button
                    onClick={() => removeEmailToInvite(email)}
                    type="button"
                  >
                    <X className="size-4 text-zinc-400" />
                  </button>
                </div>
              ))}
            </div>

            <div className="w-full h-px bg-zinc-800" />

            <form
              onSubmit={addNewEmailToInvite}
              className="p-2.5 bg-zinc-950 border-zinc-800 rounded-lg flex gap-2 items-center"
            >
              <div className=" flex items-center flex-1 gap-2 px-2">
                <AtSign className="size-5 text-zinc-400" />
                <input
                  className="bg-transparent text-lg text-zinc-300 flex-1 outline-none"
                  type="email"
                  name="email"
                  placeholder="Digite o e-mail do convidado"
                />
              </div>
              <button
                type="submit"
                className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400 transition-colors"
              >
                Convidar
                <Plus className="size-5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
