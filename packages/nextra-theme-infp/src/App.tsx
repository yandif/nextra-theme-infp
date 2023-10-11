import React from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './components/ui/select';
const App = () => {
  return (
    <div className="w-[200px] p-4">
      <Select
        value="light"
        onValueChange={(value) => {
          console.log(value);
        }}>
        <SelectTrigger className="focus:outline-none" title="Change theme">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">light</SelectItem>
          <SelectItem value="dark">dark</SelectItem>
          <SelectItem value="system">system</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
export default App;
