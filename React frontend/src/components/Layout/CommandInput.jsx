import { useState } from "react";

export default function CommandInput({ onCommandSubmit, messages }) {
  const [command, setCommand] = useState("");
  const [disableInput, setDisableInput] = useState(false); // State to disable input

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCommand("");
    setDisableInput(true); // Disable input while waiting for response
    await onCommandSubmit(command);
    setDisableInput(false); // Enable input after respose
  };
  
  return (
    <form className="flex gap-6 w-[100%]">
      <input
        className="cmd-input text-base text-ellipsis px-18 w-[350px] overflow-hidden"
        type="text"
        placeholder="Please ask me"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
         // Disable input based on the disableInput state
      />
      {command.length === 0 ? (
        <button type="submit" className="py-2 px-5 bg-blue-600 rounded-full text-white pt-2" disabled={disableInput}>
        Submit
      </button>
      ) : (
        <button type="submit" onClick={handleSubmit} className="py-2 px-5 bg-blue-500 rounded-full text-white pt-2" disabled={disableInput}>
          Submit
        </button>
      )}
    </form>
  );
}

