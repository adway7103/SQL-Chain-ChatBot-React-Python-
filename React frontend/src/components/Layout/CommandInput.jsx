import { useState } from 'react';

export default function CommandInput({ onCommandSubmit , setMessages,messages}) {
  const [command, setCommand] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCommand("");
    setMessages([...messages,command]);
    await onCommandSubmit(command);
  };

  return (
    <form onSubmit={handleSubmit} className='flex gap-6 w-[100%]'>
      <input
        className="cmd-input text-base text-ellipsis px-18 w-[350px] overflow-hidden"
        type="text"
        placeholder="Please ask me"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
      />{command.length===0?<div className='flex justify-center align-center py-2 px-5 bg-blue-500 rounded-full text-white'><div className='flex justify center align-center'>Submit</div></div>:<button type="submit" className='py-2 px-5 bg-blue-500 rounded-full text-white'>Submit</button>}
      
    </form>
  );
}
