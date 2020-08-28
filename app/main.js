const fs = require("fs");

const NAME_OF_RULES_FILE = "./app/rules_fake.txt";
const NAME_OF_ISSUES_FILE = "./app/issues_fake.txt";

const g_ui = {
    rulesTable: document.querySelector("#sortedRules")
}

const g_data = {
    issues: undefined,
    rules: undefined
}

class Issue {
    constructor(str) {
        const [date, time, ruleIndex, severity, ...text] = str.split(/\s+/);
        this.severity = parseInt(severity);
        this.ruleIndex = parseInt(ruleIndex);
    }
}

class Rule {
    constructor(str) {
        const [ruleIndex] = str.split(/\s+/);
        const startOfRuleDescription = str.indexOf(" ") + 1;
        this.ruleIndex = parseInt(ruleIndex);
        this.ruleDescription = str.substring(startOfRuleDescription).trim();
    }
}


g_data.rules = fs.readFileSync(NAME_OF_RULES_FILE).toString().split("\n").map(str => new Rule(str.trim()));
g_data.issues = fs.readFileSync(NAME_OF_ISSUES_FILE).toString().split("\n").map(str => new Issue(str));
showRules();

function showRules() {
    for (const rule of g_data.rules) {
        const row = document.createElement("tr");

        const ruleIndexCell = document.createElement("td");
        ruleIndexCell.innerHTML = rule.ruleIndex;
        row.appendChild(ruleIndexCell);

        const severityIndexCell = document.createElement("td");
        severityIndexCell.innerHTML = g_data.issues.filter(issue => issue.ruleIndex == rule.ruleIndex).map(issue => issue.severity).reduce((a, b) => a + b, 0);;
        row.appendChild(severityIndexCell);

        const ruleDescriptionCell = document.createElement("td");
        ruleDescriptionCell.innerHTML = rule.ruleDescription;
        row.appendChild(ruleDescriptionCell);

        g_ui.rulesTable.appendChild(row);
    }
}
