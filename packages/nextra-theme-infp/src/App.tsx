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
    <Select
      value="light"
      onValueChange={(value) => {
        console.log(value);
      }}>
      <SelectTrigger title="Change theme">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">light</SelectItem>
        <SelectItem value="dark">dark</SelectItem>
        <SelectItem value="system">system</SelectItem>
      </SelectContent>
    </Select>
  );
};
export default App;
