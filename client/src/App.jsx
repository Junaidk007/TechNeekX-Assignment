import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EventProvider } from './context/EventContext';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import EventForm from './components/EventForm';

function App() {
  return (
    <EventProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="add-event" element={<EventForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </EventProvider>
  );
}

export default App;
