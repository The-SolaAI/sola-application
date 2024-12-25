import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { Mic, CloudOff, Send } from 'react-feather';
import Button from './Button';

interface SessionStoppedProps {
  startSession: () => void;
}

const SessionStopped: React.FC<SessionStoppedProps> = ({ startSession }) => {
  const [isActivating, setIsActivating] = useState(false);

  const handleStartSession = () => {
    if (isActivating) return;

    setIsActivating(true);
    startSession();
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <Button onClick={handleStartSession} icon={<Mic height={16} />}>
        {isActivating ? 'Connecting...' : 'Start Conversation'}
      </Button>
    </div>
  );
};

interface SessionActiveProps {
  stopSession: () => void;
  sendTextMessage: (message: string) => void;
}

const SessionActive: React.FC<SessionActiveProps> = ({
  stopSession,
  sendTextMessage,
}) => {
  const [message, setMessage] = useState('');

  const handleSendClientEvent = () => {
    sendTextMessage(message);
    setMessage('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && message.trim()) {
      handleSendClientEvent();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div className="flex items-center justify-center w-full h-full gap-4">
      <input
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="send a text message..."
        className="border border-[#E7E7E7] bg-graydark rounded-2xl p-4 min-w-full flex"
        value={message}
        onChange={handleChange}
      />
      <Button
        onClick={() => {
          if (message.trim()) {
            handleSendClientEvent();
          }
        }}
        icon={<Send height={16} />}
        className="rounded-full p-4 w-16 h-16"
      ></Button>
      <Button
        onClick={stopSession}
        icon={<CloudOff height={16} />}
        className="rounded-full p-4 w-16 h-16"
      ></Button>
    </div>
  );
};

interface SessionControlsProps {
  startSession: () => void;
  stopSession: () => void;
  sendTextMessage: (message: string) => void;
  isSessionActive: boolean;
}

const SessionControls: React.FC<SessionControlsProps> = ({
  startSession,
  stopSession,
  sendTextMessage,
  isSessionActive,
}) => {
  return (
    <div className="flex gap-4 h-full rounded-md">
      {isSessionActive ? (
        <SessionActive
          stopSession={stopSession}
          sendTextMessage={sendTextMessage}
        />
      ) : (
        <SessionStopped startSession={startSession} />
      )}
    </div>
  );
};

export default SessionControls;
