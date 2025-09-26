'use client';

import type { Condition } from '@/lib/data';
import { format, parseISO } from 'date-fns';
import { TrendingDown, TrendingUp, ChevronDown } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


interface ConditionCardProps {
  condition: Condition;
}

const chartConfigBase: ChartConfig = {
  value: { label: 'Value', color: 'hsl(var(--primary))' },
  systolic: { label: 'Systolic', color: 'hsl(var(--primary))' },
  diastolic: { label: 'Diastolic', color: 'hsl(var(--secondary))' },
};


const getChartData = (condition: Condition) => {
  if (!condition.measurements) return null;

  return condition.measurements.map(m => {
      const base = { month: format(parseISO(m.date), 'MMM') };
      if (typeof m.value === 'number') {
          return { ...base, value: m.value };
      } else {
          return { ...base, systolic: m.value.systolic, diastolic: m.value.diastolic };
      }
  });
};

const renderChart = (condition: Condition, chartData: any[]) => {
    const isHypertension = condition.name === 'Hypertension';
    
    return (
        <ResponsiveContainer width="100%" height={150}>
            <AreaChart data={chartData}>
                <defs>
                    <linearGradient id="fillPrimary" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                    </linearGradient>
                    {isHypertension && (
                        <linearGradient id="fillSecondary" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0.1}/>
                        </linearGradient>
                    )}
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis domain={['dataMin - 10', 'dataMax + 10']} hide />
                <Tooltip content={<ChartTooltipContent indicator="dot" />} />
                {isHypertension ? (
                    <>
                        <Area dataKey="systolic" type="natural" fill="url(#fillPrimary)" fillOpacity={0.4} stroke="hsl(var(--primary))" stackId="a" />
                        <Area dataKey="diastolic" type="natural" fill="url(#fillSecondary)" fillOpacity={0.4} stroke="hsl(var(--secondary))" stackId="b" />
                    </>
                ) : (
                    <Area dataKey="value" type="natural" fill="url(#fillPrimary)" fillOpacity={0.4} stroke="hsl(var(--primary))" stackId="c" />
                )}
                 <Legend />
            </AreaChart>
        </ResponsiveContainer>
    );
};

const getTrend = (measurements: Condition['measurements']) => {
    if (!measurements || measurements.length < 2) return { trend: 'stable', change: 0, unit: ''};

    const first = measurements[0].value;
    const last = measurements[measurements.length - 1].value;

    if (typeof first === 'number' && typeof last === 'number') {
        const change = last - first;
        const trend = change < 0 ? 'down' : 'up';
        return { trend, change: Math.abs(change), unit: 'mg/dL' };
    }
    
    if (typeof first === 'object' && typeof last === 'object') {
         const change = last.systolic - first.systolic;
         const trend = change < 0 ? 'down' : 'up';
         return { trend, change: Math.abs(change), unit: 'mmHg' };
    }
    
    return { trend: 'stable', change: 0, unit: '' };
}

const ConditionCard = ({ condition }: ConditionCardProps) => {
  const chartData = getChartData(condition);
  const { trend, change, unit } = getTrend(condition.measurements);

  return (
    <Accordion type="single" collapsible>
        <AccordionItem value={condition.name} className='border-none'>
            <Card className="overflow-hidden">
                <CardHeader className="pb-2">
                    <CardTitle className="font-headline text-xl">{condition.name}</CardTitle>
                    <CardDescription>Diagnosed: {format(new Date(condition.diagnosed), 'MMM yyyy')}</CardDescription>
                </CardHeader>
                <CardContent>
                    {chartData && (
                        <div className="h-[150px] w-full">
                           <ChartContainer config={chartConfigBase}>
                                {renderChart(condition, chartData)}
                           </ChartContainer>
                        </div>
                    )}
                </CardContent>
                <CardFooter>
                    <div className="w-full">
                        {chartData && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                {trend === 'down' ? <TrendingDown className="h-4 w-4 text-green-500" /> : <TrendingUp className="h-4 w-4 text-red-500" />}
                                <p>
                                    <span className={`font-medium ${trend === 'down' ? 'text-green-500' : 'text-red-500'}`}>
                                        {trend === 'down' ? 'Decreased' : 'Increased'} by {change} {unit}
                                    </span>
                                    {' '}in last 6 months.
                                </p>
                            </div>
                        )}
                        <AccordionTrigger className='p-0 text-sm hover:no-underline justify-start gap-1'>
                            View More Details
                        </AccordionTrigger>
                    </div>
                </CardFooter>
                 <AccordionContent>
                    <div className="bg-muted/50 p-6 text-sm">
                        <p className="font-semibold mb-2">Detailed Readings:</p>
                        <ul className="space-y-1">
                            {condition.measurements?.map(m => (
                                <li key={m.date} className='flex justify-between'>
                                    <span>{format(parseISO(m.date), 'MMMM d, yyyy')}:</span>
                                    <span className='font-mono'>
                                        {typeof m.value === 'number' ? `${m.value} mg/dL` : `${m.value.systolic}/${m.value.diastolic} mmHg`}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </AccordionContent>
            </Card>
        </AccordionItem>
    </Accordion>
  );
};

export default ConditionCard;
