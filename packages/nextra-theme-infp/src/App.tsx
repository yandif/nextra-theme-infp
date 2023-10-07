import React from 'react';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Button } from './components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './components/ui/navigation-menu';

function Component() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="font-mono">
        <CardHeader className="text-red-500">
          <CardTitle>@nextjs</CardTitle>
        </CardHeader>
        <CardContent className="text-green-500">
          The React Framework – created and maintained by @vercel.
        </CardContent>
        <CardFooter className="text-blue-500">
          <div className="flex items-center space-x-4">
            <Button className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 dark:bg-red-50">
              Red
            </Button>
            <Button className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600">
              Green
            </Button>
            <Button className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">
              Blue
            </Button>
            <Button className="bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600">
              Yellow
            </Button>
            <Button className="bg-purple-500 text-white px-4 py-2 rounded shadow hover:bg-purple-600">
              Purple
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

const App = () => {
  return (
    <div>
      <NavigationMenu className="inline-block">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink className="block w-40 h-40 p-4 bg-yellow-200">
                1
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <NavigationMenu className="inline-block">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item Two</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink className="block w-40 h-40 p-4 bg-red-200">
                2
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <NavigationMenu className="inline-block">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item three</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink className="block w-40 h-40 p-4 bg-green-200">
                3
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Button>hello</Button>
      <Component />
    </div>
  );
};
export default App;
