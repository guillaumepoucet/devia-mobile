import ContainerLayout from "@/components/ContainerLayout";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { FontAwesome6 } from "@expo/vector-icons";
import { ScrollView } from "react-native";

type Task = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  dueDate: Date;
  priority: number;
  tags: string[];
  notes: string;
  completedAt: Date | null;
};

type Event = {
  id: number;
  title: string;
  startDate: string; // format iso avec un fuseau horaire
  endDate: string; // format iso avec un fuseau horaire
  location: string | null;
  description: string;
  allDay: boolean;
};

const tasks: Task[] = [
  {
    id: 1,
    title: "Task 1",
    completed: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    dueDate: new Date(),
    priority: 1,
    tags: ["work", "personal"],
    notes: "This is a note for task 1",
    completedAt: new Date(),
  },
  {
    id: 2,
    title: "Task 2",
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    dueDate: new Date(),
    priority: 2,
    tags: ["work"],
    notes: "This is a note for task 2",
    completedAt: null,
  },
];

const events: Event[] = [
  {
    id: 1,
    title: "Event 1",
    startDate: "2023-10-01T10:00:00+02:00", // format iso avec un fuseau horaire
    endDate: "2023-10-01T11:00:00+02:00", // format iso avec un fuseau horaire
    location: "Location 1",
    description: "This is a description for event 1",
    allDay: false,
  },
  {
    id: 2,
    title: "Event 2",
    startDate: "2023-10-02T10:00:00+02:00", // format iso avec un fuseau horaire
    endDate: "2023-10-02T11:00:00+02:00", // format iso avec un fuseau horaire
    description: "This is a description for event 2",
    location: null,
    allDay: true,
  },
  {
    id: 3,
    title: "Event 3",
    startDate: "2023-10-03T10:00:00+02:00", // format iso avec un fuseau horaire
    endDate: "2023-10-03T11:00:00+02:00", // format iso avec un fuseau horaire
    location: "Location 3",
    description: "This is a description for event 3",
    allDay: false,
  },
];

const TaskItem = ({
  id,
  title,
  completed,
  createdAt,
  updatedAt,
  dueDate,
  priority,
  tags,
  notes,
  completedAt,
}: Task) => {
  const size = 20;
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 12,
      }}
    >
      {completed ? (
        <FontAwesome6 name="circle-check" size={size} />
      ) : (
        <FontAwesome6 name="circle" size={size} />
      )}
      <Text
        style={{
          fontSize: 18,
          textDecorationLine: completed ? "line-through" : "none",
        }}
      >
        {title}
      </Text>
    </View>
  );
};

const EventItem = ({
  id,
  title,
  startDate,
  endDate,
  location,
  description,
  allDay,
}: Event) => {
  const time = new Date(startDate).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <View
      style={{
        marginBottom: 20,
      }}
    >
      {!allDay && (
        <Text
          style={{
            fontSize: 14,
            marginBottom: 10,
            backgroundColor: Colors.dark.green,
            fontWeight: "bold",
            paddingHorizontal: 20,
            alignSelf: "flex-start",
            // color: Colors.dark.tint,
          }}
        >
          {time}
        </Text>
      )}
      <View style={{ paddingHorizontal: 20 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 5,
          }}
        >
          {title}
        </Text>
        {!allDay && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
            }}
          >
            <FontAwesome6 name="clock" size={12} color={Colors.dark.gray} />
            <Text style={{ fontSize: 14, color: Colors.dark.gray }}>
              {new Date(startDate).toLocaleString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}{" "}
              -{" "}
              {new Date(endDate).toLocaleString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </Text>
          </View>
        )}
        {location && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              marginTop: 5,
            }}
          >
            <FontAwesome6 name="map" size={12} color={Colors.dark.gray} />
            <Text style={{ fontSize: 14, color: Colors.dark.gray }}>
              {location}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default function Calendar() {
  const todayDate = new Date();
  const today = {
    weekday: todayDate.toLocaleDateString("fr-FR", { weekday: "long" }),
    day: todayDate.toLocaleDateString("fr-FR", { day: "2-digit" }),
    month: todayDate.toLocaleDateString("fr-FR", { month: "long" }),
    year: todayDate.toLocaleDateString("fr-FR", { year: "numeric" }),
    time: todayDate.toLocaleTimeString("fr-FR"),
  };

  return (
    <View
      style={{ flex: 1, justifyContent: "flex-start", alignContent: "center" }}
    >
      <ContainerLayout>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              marginBottom: 5,
              fontFamily: "Glyphic",
              fontSize: 48,
            }}
          >
            {today.day}
          </Text>
          <View>
            <Text
              style={{
                fontFamily: "Glyphic",
                fontSize: 16,
                color: Colors.dark.gray,
              }}
            >
              {today.year}
            </Text>
            <Text
              style={{
                fontFamily: "Glyphic",
                fontSize: 24,
              }}
            >
              {today.month}
            </Text>
          </View>
        </View>
        <Text
          style={{
            marginBottom: 5,
            fontFamily: "Glyphic",
            fontSize: 32,
          }}
        >
          {today.weekday.charAt(0).toUpperCase() + today.weekday.slice(1)}
        </Text>
      </ContainerLayout>
      <ScrollView style={{ flex: 1, paddingTop: 10 }}>
        <Text
          style={{
            fontSize: 14,
            marginBottom: 14,
            backgroundColor: Colors.dark.accent,
            fontWeight: "bold",
            paddingHorizontal: 20,
          }}
        >
          TACHES
        </Text>
        <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              id={task.id}
              title={task.title}
              completed={task.completed}
              createdAt={task.createdAt}
              updatedAt={task.updatedAt}
              dueDate={task.dueDate}
              priority={task.priority}
              tags={task.tags}
              notes={task.notes}
              completedAt={task.completedAt}
            />
          ))}
        </View>
        <Text
          style={{
            fontSize: 14,
            marginBottom: 14,
            backgroundColor: Colors.dark.green,
            fontWeight: "bold",
            paddingHorizontal: 20,
            textTransform: "uppercase",
          }}
        >
          Toute la journée
        </Text>
        <View>
          {events
            .filter((e) => e.allDay)
            .map((event) => (
              <EventItem
                key={event.id}
                id={event.id}
                title={event.title}
                startDate={event.startDate}
                endDate={event.endDate}
                description={event.description}
                allDay={event.allDay}
                location={event.location}
              />
            ))}
        </View>
        <View>
          {events
            .filter((e) => !e.allDay)
            .map((event) => (
              <EventItem
                key={event.id}
                id={event.id}
                title={event.title}
                startDate={event.startDate}
                endDate={event.endDate}
                description={event.description}
                allDay={event.allDay}
                location={event.location}
              />
            ))}
        </View>
        <Text
          style={{
            fontSize: 14,
            marginBottom: 14,
            backgroundColor: Colors.dark.blue,
            fontWeight: "bold",
            paddingHorizontal: 20,
            textTransform: "uppercase",
          }}
        >
          Note
        </Text>
      </ScrollView>
    </View>
  );
}
