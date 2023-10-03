"use client";

import React, { useMemo } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Link,
  Image,
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

const PdfDocument = ({ terms }: DocumentProps) => {
  const gpa = calculateGpa(terms);
  const host = window.location.host;
  const date = new Date().toLocaleDateString("en-AU");

  return (
    <PDFViewer className="w-full h-full absolute">
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={{ marginBottom: 16 }}>
            <Image
              src="/luna.png"
              style={{ width: 56, padding: 1, marginBottom: 8, marginLeft: 1 }}
            />
            <Text>University of Melbourne WAM to GPA Conversion</Text>
            <Text style={{ fontSize: 11, marginTop: 8 }}>
              Created by {host} on {date}
            </Text>
          </View>
          {terms.map((term, i) => {
            const termGpa = calculateGpa([term]);
            if (termGpa === undefined) return <View />;
            return (
              <View key={i} style={{ marginTop: 8 }}>
                <Text style={{ fontSize: 14 }}>Term {i + 1}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    fontSize: 11,
                    fontWeight: "bold",
                    marginTop: 8,
                    marginBottom: 4,
                    paddingVertical: 4,
                    borderBottom: "1px solid #aaaaaa",
                  }}
                >
                  <View style={{ flex: 6 }}>
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
                    <Text>Point</Text>
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
                          fontSize: 10,
                          paddingVertical: 2,
                        }}
                      >
                        <View style={{ flex: 6 }}>
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
                          <Text>{gradePoint.toFixed(2)}</Text>
                        </View>
                      </View>
                    );
                  })}
                <View
                  style={{
                    marginTop: 4,
                    flexDirection: "row",
                    fontSize: 10,
                    paddingVertical: 4,
                    gap: 4,
                    borderTop: "1px solid #d0d0d0",
                  }}
                >
                  <View style={{ flex: 8 }} />
                  <Text style={{ flex: 1 }}>Term GPA:</Text>
                  <Text style={{ flex: 1 }}>{termGpa.toFixed(2)}</Text>
                </View>
              </View>
            );
          })}
          {!!gpa && (
            <View style={{ marginTop: 24 }}>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                Cumulative GPA: {gpa.toFixed(2)}/4.00
              </Text>

              <Text style={{ fontSize: 9, marginTop: 8, lineHeight: 1.5 }}>
                This tool is provided by LPDP Unimelb Association (LuNA) for
                informational use only. For more information on how we calculate
                the GPA conversion, visit{" "}
                <Link src="https://wamtogpa.lpdpunimelb.com/help">
                  wamtogpa.lpdpunimelb.com/help
                </Link>
                .
              </Text>
            </View>
          )}
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PdfDocument;
