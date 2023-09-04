"use client";

import React, { useMemo } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { Term } from "@/types";
import getGradeFromMark, { getGradePointFromGrade } from "@/grades";
import calculateGpa from "@/calculateGpa";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    padding: 24,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
interface DocumentProps {
  terms: Term[];
}

const MyDocument = ({ terms }: DocumentProps) => {
  const gpa = calculateGpa(terms);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text>University of Melbourne WAM to GPA Conversion</Text>
          <Text style={{ fontSize: 11, marginTop: 8 }}>
            This is not an official WAM to GPA conversion. Please use
            accordingly.
          </Text>
        </View>
        {terms.map((term, i) => {
          const termGpa = calculateGpa([term]);
          if (termGpa === undefined) return <View />;
          return (
            <View key={i} style={{ marginTop: 24 }}>
              <Text style={{ fontSize: 14 }}>Term {i + 1}</Text>
              <View
                style={{
                  flexDirection: "row",
                  fontSize: 12,
                  fontWeight: "bold",
                  marginTop: 8,
                  marginBottom: 4,
                  paddingVertical: 4,
                  borderBottom: "1px solid #aaaaaa",
                }}
              >
                <View style={{ flex: 4 }}>
                  <Text>Subject</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text>Credit</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text>Mark</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text>Grade</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text>Grade Point</Text>
                </View>
              </View>
              {term.subjects
                .filter(
                  (s) =>
                    s.name &&
                    !isNaN(parseFloat(s.credit)) &&
                    !isNaN(parseFloat(s.mark))
                )
                .map((subject, i) => {
                  const grade = getGradeFromMark(parseFloat(subject.mark));
                  const gradePoint = getGradePointFromGrade(grade);
                  return (
                    <View
                      key={i}
                      style={{
                        flexDirection: "row",
                        fontSize: 11,
                        paddingVertical: 4,
                      }}
                    >
                      <View style={{ flex: 4 }}>
                        <Text>{subject.name}</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text>{subject.credit}</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text>{subject.mark}</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text>{grade}</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text>{gradePoint}</Text>
                      </View>
                    </View>
                  );
                })}
              <View style={{ marginTop: 16 }}>
                <Text style={{ fontSize: 12 }}>Term GPA: {termGpa}/4.00</Text>
              </View>
            </View>
          );
        })}
        <View style={{ marginTop: 24 }}>
          <Text style={{ fontSize: 12, fontWeight: "bold" }}>
            Cummulative GPA: {gpa}/4.00
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default function CreatePdf() {
  const terms = useMemo(() => {
    try {
      const jsonStr = localStorage.getItem("data") ?? "[]";
      return JSON.parse(jsonStr);
    } catch {
      return [];
    }
  }, []);

  return (
    <PDFViewer className="w-full h-full absolute">
      <MyDocument terms={terms} />
    </PDFViewer>
  );
}
