import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { HttpService } from '../http.service';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class LeavingServiceService {
  
  constructor(private http: HttpClient,
    private httpService:HttpService
  ) {
   }

  serviceCall(formDetails: any) {
    console.log("in the service call")
    const requestUrl = environment.baseUrl + '/leaving';

    let headers = {};

    if (this.httpService.getAuthToken() !== null) {
      headers = {
        Authorization: 'Bearer ' + this.httpService.getAuthToken()
      };
    }
    return this.http.post(requestUrl, formDetails, {headers:headers})
  }

  generateLeavingCertificatePDF(formData: any) {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    
    // Add school header
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(formData.school || 'SCHOOL NAME', pageWidth/2, 25, { align: 'center' });
    
    doc.setFontSize(14);
    doc.text('SCHOOL LEAVING CERTIFICATE', pageWidth/2, 35, { align: 'center' });
    
    // Add a line under header
    doc.setLineWidth(0.5);
    doc.line(20, 40, pageWidth - 20, 40);
    
    // Certificate content
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    let yPos = 55;
    const lineHeight = 8;
    const leftMargin = 25;
    const rightMargin = pageWidth - 25;

    // Helper function to add a line of text
    const addLine = (label: string, value: string, isBold: boolean = false) => {
      if (isBold) {
        doc.setFont('helvetica', 'bold');
      }
      doc.text(`${label}:`, leftMargin, yPos);
      doc.setFont('helvetica', 'normal');
      
      // Handle long text by wrapping
      const maxWidth = rightMargin - leftMargin - 60;
      const splitText = doc.splitTextToSize(value || 'N/A', maxWidth);
      doc.text(splitText, leftMargin + 60, yPos);
      
      yPos += lineHeight * splitText.length;
      if (splitText.length > 1) yPos += 2; // Extra space for multi-line entries
    };

    // Certificate details
    addLine('Name of Pupil', formData.pupilsName, true);
    yPos += 2;
    addLine('Index Number', formData.indexNo);
    addLine('Date of Birth', formData.dateofBirth);
    addLine('Religion', formData.religion);
    addLine('Name of Parent/Guardian', formData.fullnameofthefatherGardian);
    
    yPos += 3;
    addLine('Address', formData.address);
    
    yPos += 5;
    addLine('Date of Admission', formData.dateofAdmission);
    addLine('Date of Leaving', formData.dateofLeaving);
    addLine('Cause of Leaving', formData.causeLeaving);
    
    yPos += 5;
    addLine('Last Grade Passed', formData.lastgradePassed);
    addLine('Medium of Learning', formData.mediumLearned);
    addLine('Academic Progress', formData.progressinacademicField);
    addLine('Behaviour', formData.behaviour);
    
    yPos += 5;
    if (formData.extraCurricular && formData.extraCurricular !== 'N/A') {
      addLine('Extra-Curricular Activities', formData.extraCurricular);
    }
    
    if (formData.specialAchievements && formData.specialAchievements !== 'N/A') {
      addLine('Special Achievements', formData.specialAchievements);
    }
    
    // Add certification statement
    yPos += 10;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const certStatement = 'This is to certify that the above information is correct according to the school records.';
    const wrappedStatement = doc.splitTextToSize(certStatement, rightMargin - leftMargin);
    doc.text(wrappedStatement, leftMargin, yPos);
    
    // Add signature section
    yPos = pageHeight - 60;
    doc.setFontSize(10);
    
    // Date and Principal signature
    doc.text('Date: ' + (formData.dateIssued || new Date().toLocaleDateString()), leftMargin, yPos);
    doc.text('Principal: ' + (formData.principalsName || '_____________________'), leftMargin, yPos + 15);
    
    // Signature lines
    doc.line(leftMargin + 50, yPos + 20, leftMargin + 120, yPos + 20);
    doc.text('Principal\'s Signature', leftMargin + 60, yPos + 25);
    
    // School seal area
    doc.setFontSize(8);
    doc.text('(School Seal)', pageWidth - 80, yPos + 15);
    doc.rect(pageWidth - 85, yPos, 30, 20); // Rectangle for seal
    
    return doc;
  }

  generateCharacterCertificatePDF(formData: any) {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    
    // Add header
    doc.setFontSize(20);
    doc.text('CHARACTER CERTIFICATE', pageWidth/2, 20, { align: 'center' });
    
    // Add content
    doc.setFontSize(12);
    let yPos = 40;
    const lineHeight = 10;

    // Helper function to add a line of text
    const addLine = (label: string, value: string) => {
      doc.text(`${label}: ${value}`, 20, yPos);
      yPos += lineHeight;
    };

    addLine('Name of Pupil', formData.pupilsName);
    addLine('Index Number', formData.indexNo);
    addLine('Date of Birth', formData.dateofBirth);
    addLine('Religion', formData.religion);
    addLine('Name of Parent/Guardian', formData.fullnameofthefatherGardian);
    addLine('Address', formData.addressofthefatherGardian);
    addLine('Date of Admission', formData.dateofAdmission);
    
    // Add behavior and skills section
    yPos += lineHeight;
    doc.text('Character Assessment:', 20, yPos);
    yPos += lineHeight;
    doc.setFontSize(10);
    
    if (formData.goodBehaviour) {
      doc.text('The student has maintained good behavior throughout their academic career.', 30, yPos, { maxWidth: pageWidth - 60 });
    }
    
    yPos += 20;
    doc.setFontSize(12);
    doc.text('Special Skills and Achievements:', 20, yPos);
    yPos += lineHeight;
    doc.setFontSize(10);
    doc.text(formData.specialSkills || 'N/A', 30, yPos, { maxWidth: pageWidth - 60 });
    
    yPos += 20;
    doc.setFontSize(12);
    doc.text('Leadership Skills:', 20, yPos);
    yPos += lineHeight;
    doc.setFontSize(10);
    doc.text(formData.leadershipSkills || 'N/A', 30, yPos, { maxWidth: pageWidth - 60 });
    
    yPos += 20;
    doc.setFontSize(12);
    doc.text('Principal\'s Recommendation:', 20, yPos);
    yPos += lineHeight;
    doc.setFontSize(10);
    doc.text(formData.principalsRecomendation || 'N/A', 30, yPos, { maxWidth: pageWidth - 60 });
    
    // Add signature line
    yPos = 250;
    doc.line(20, yPos, 90, yPos);
    doc.line(pageWidth-90, yPos, pageWidth-20, yPos);
    yPos += 5;
    doc.setFontSize(10);
    doc.text('Date', 20, yPos);
    doc.text('Principal\'s Signature', pageWidth-90, yPos);

    return doc;
  }
}
