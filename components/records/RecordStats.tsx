import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useRecordStatsQuery } from "@/lib/features/apis/RecordApi";
import { LuHeart } from "react-icons/lu";

const RecordStats = () => {
  const { data } = useRecordStatsQuery();
  console.log(data);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      {/* {isLoading ? (
                <StatsCardsSkeleton />
              ) : ( */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {data?.data.stats[0].title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-display text-2xl font-bold">
              {" "}
              {data?.data.stats[0].value}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {data?.data.stats[2].title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-display text-2xl font-bold text-warning">
              {data?.data.stats[2].value}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {data?.data.stats[1].title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-display flex items-center gap-2 text-2xl font-bold">
              <LuHeart className="text-red-700" />
              {data?.data.stats[1].value}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {data?.data.stats[3].title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-display text-2xl font-bold text-accent">
              {data?.data.stats[3].value}
            </p>
          </CardContent>
        </Card>
      </div>
      {/* )} */}
    </motion.div>
  );
};

export default RecordStats;
