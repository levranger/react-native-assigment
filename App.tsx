import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { LeaderboardScreen } from "./src/screens/leaderboard/leaderboard";
import { ProfileLookupScreen } from "./src/screens/profile-lookup/profile-lookup";


const Tab = createBottomTabNavigator();
const queryClient = new QueryClient();
export default function App() {
  return (
      <QueryClientProvider client={queryClient}>
          <NavigationContainer>
              <Tab.Navigator>
                  <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
                  <Tab.Screen name="Profile Lookup" component={ProfileLookupScreen} />
              </Tab.Navigator>
          </NavigationContainer>
      </QueryClientProvider>
  );
}
