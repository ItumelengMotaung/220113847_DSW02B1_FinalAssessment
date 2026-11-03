4.1 

Immediate Execution Bug: Changed <Pressable onPress="{onToggle(report.id)}"> to an arrow function () => onToggle(...) so it only fires on user interaction.
State Mutation: Replaced the direct array mutation (next.find(...) and item.resolved = !item.resolved) with .map() to return a brand-new array, guaranteeing immutable state updates.
Unstable Keys: Updated keyExtractor to use item.id.toString() instead of the array index to prevent rendering bugs during list updates.
Animation Memory Leak/Restarts: Wrapped Animated.Value in useRef(...).current so the value persists across re-renders. Added useNativeDriver: true for performance and corrected the useEffect dependency array.



4.5
Welcome to MuniFix SA. South African municipalities struggle with infrastructure backlogs, leaving citizens frustrated. We built this MuniFix for local residents to quickly report faults directly to the city. Three key features include: categorized fault reporting for issues like potholes, distinct visual tracking so users instantly see if a fault is 'Open' or 'Resolved', and an automated live dashboard counter tracking total active issues. Our main known limitation right now is the lack of offline functionality for areas with poor load-shedding signal, which we will address in version two. This tool simplifies reporting and accelerates service delivery. 